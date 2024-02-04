import { Hono } from "hono";
import { InMemoryGameRepository } from "./infra/game.in-memory.repository";
import { GameService } from "./domain/game.service";
import { Player } from "./domain/player";
import { Layout } from "./presentation/Layout";
import { Game } from "./presentation/components/Game";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { ErrorInfo } from "./presentation/components/ErrorInfo";

const app = new Hono();

const gameRepository = new InMemoryGameRepository();
const gameService = new GameService(gameRepository);

const addScoreSchema = z.object({
	game: z.string(),
	score: z.string().pipe(z.coerce.number().min(100).max(10000)),
});

const addFailureSchema = z.object({
	game: z.string(),
});

const bob = new Player("Bob");
const alice = new Player("Alice");

const game = await gameService.createGame([bob, alice]);
await gameService.addScore(game.id, 1800);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addScore(game.id, 2000);
await gameService.addScore(game.id, 200);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);
await gameService.addFailure(game.id);

app.use("/game/*", async (c, next) => {
	c.setRenderer((content) => {
		return c.html(<Layout>{content}</Layout>);
	});
	await next();
});

app.post("/game", async (c) => {
	const game = await gameService.createGame([bob, alice]);
	return c.render(<Game game={game} />);
});

app.post("/score", zValidator("form", addScoreSchema), async (c) => {
	const { game: id, score } = c.req.valid("form");

	const game = await gameService.addScore(id, score);
	return c.render(<Game game={game} />);
});

app.post("/failure", zValidator("form", addFailureSchema), async (c) => {
	const { game: id } = c.req.valid("form");

	const game = await gameService.addFailure(id);
	return c.render(<Game game={game} />);
});

app.get("/", async (c) => {
	return c.redirect(`/game/${game.id}`);
});

app.get("/game/:id", async (c) => {
	const id = c.req.param("id");
	const game = await gameRepository.load(id);
	return c.render(<Game game={game} />);
});

app.onError((err, c) => {
	c.header("HX-Retarget", "#error");
	return c.render(<ErrorInfo error={err.message} />);
});

export default app;
