import { Hono } from "hono";
import { InMemoryGameRepository } from "./infra/game.in-memory.repository";
import { GameService } from "./domain/game.service";
import { Player } from "./domain/player";
import { Layout } from "./presentation/Layout";
import { Game } from "./presentation/components/Game";

const app = new Hono();

const gameRepository = new InMemoryGameRepository();
const gameService = new GameService(gameRepository);

const bob = new Player("Bob");
const alice = new Player("Alice");

const game = await gameService.createGame([bob, alice]);
await gameService.addScore(game.id, 1800);

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

app.get("/", async (c) => {
	return c.render(<Game game={game} />);
});

export default app;
