import { Hono } from "hono";
import { InMemoryGameRepository } from "./infra/game.in-memory.repository";
import { GameService } from "./domain/game.service";
import { Player } from "./domain/player";
import { Layout } from "./presentation/Layout";
import { Game } from "./presentation/components/Game";
import { Controls } from "./presentation/components/Controls";

const app = new Hono();

const gameRepository = new InMemoryGameRepository();
const gameService = new GameService(gameRepository);

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

app.use("*", async (c, next) => {
	c.setRenderer((content) => {
		return c.html(<Layout>{content}</Layout>);
	});
	await next();
});

app.post("/game", async (c) => {
	const game = await gameService.createGame([bob, alice]);
	return c.render(<Game game={game} />);
});

app.post("/score", async (c) => {
	const body = await c.req.parseBody();
	const gameId = body.game;
	if (typeof gameId !== "string") {
		throw new Error("Invalid game id");
	}
	const scoreString = body.score;
	if (typeof scoreString !== "string") {
		throw new Error("Invalid score");
	}
	const score = parseInt(scoreString, 10);

	const game = await gameService.addScore(gameId, score);
	return c.render(<Game game={game} />);
});

app.get("/", async (c) => {
	return c.render(
		<>
			<Game game={game} />
			<Controls currentPlayer={game.currentPlayer.name} gameId={game.id} />
		</>,
	);
});

export default app;
