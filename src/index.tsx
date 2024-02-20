import { Hono } from "hono";
import { GameService } from "./domain/game.service";
import { Player } from "./domain/player/player";
import { Layout } from "./presentation/Layout";
import { Game } from "./presentation/components/Game";
import { z } from "zod";
import { serveStatic } from "hono/cloudflare-workers";
import { zValidator } from "@hono/zod-validator";
import { ErrorInfo } from "./presentation/components/ErrorInfo";
import { Score } from "./presentation/components/Score";
import { Controls } from "./presentation/components/Controls";
import { GameNotFoundError } from "./infra/game-not-found.error";
import { Home } from "./presentation/pages/Home";
import { KVGameRepository } from "./infra/game.kv.repository";
import { createPlayers } from "./domain/player/player.factory";

const app = new Hono<{ Bindings: Bindings }>();

const services = (env: Bindings) => {
	const gameRepository = new KVGameRepository(env.games);
	const gameService = new GameService(gameRepository);

	return { gameService, gameRepository };
};

const addScoreSchema = z.object({
	game: z.string(),
	score: z.string().pipe(z.coerce.number().min(100).max(10000)),
	slider: z.string().optional().pipe(z.coerce.number().min(0).max(499)),
});

const addFailureSchema = z.object({
	game: z.string(),
});

const bob = new Player("Bob");
const alice = new Player("Alice");
const lucien = new Player("Lucien");
const bruno = new Player("Bruno");

app.use("/static/*", serveStatic());

app.use("/games/*", async (c, next) => {
	c.setRenderer((content) => {
		return c.html(<Layout>{content}</Layout>);
	});
	await next();
});

app.post("/score", zValidator("form", addScoreSchema), async (c) => {
	const { game: id, score, slider } = c.req.valid("form");
	const { gameService } = services(c.env);
	const game = await gameService.addScore(id, score);
	c.header("HX-Trigger", "update-score");
	return c.render(<Controls game={game} slider={slider} />);
});

app.post("/failure", zValidator("form", addFailureSchema), async (c) => {
	const { game: id } = c.req.valid("form");

	const { gameService } = services(c.env);
	const game = await gameService.addFailure(id);
	c.header("HX-Trigger", "update-score");
	return c.render(<Controls game={game} />);
});

app.get("/", async (c) => {
	const { gameRepository } = services(c.env);
	const games = await gameRepository.list();
	const players = createPlayers(10);
	return c.render(<Home games={games} players={players} />);
});

app.get("/games/:id", async (c) => {
	const id = c.req.param("id");
	const { gameRepository } = services(c.env);
	const game = await gameRepository.load(id);
	return c.render(<Game game={game} />);
});

app.get("/partials/score/:id", async (c) => {
	const id = c.req.param("id");
	const { gameRepository } = services(c.env);
	const game = await gameRepository.load(id);
	return c.render(<Score game={game} />);
});

app.onError(async (err, c) => {
	if (err instanceof GameNotFoundError) {
		const { gameService } = services(c.env);
		await gameService.createGame([bob, alice, lucien, bruno]);
		return c.redirect("/");
	}
	c.header("HX-Retarget", "#error");
	return c.render(<ErrorInfo error={err.message} />);
});

export default app;
