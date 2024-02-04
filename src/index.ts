import { Hono } from "hono";
import { InMemoryGameRepository } from "./infra/game.in-memory.repository";
import { GameService } from "./domain/game.service";
import { Player } from "./domain/player";

const app = new Hono();

const gameRepository = new InMemoryGameRepository();
const gameService = new GameService(gameRepository);

const bob = new Player("Bob");
const alice = new Player("Alice");

app.post("/game", async (c) => {
	const game = await gameService.createGame([bob, alice]);
	return c.json(game);
});

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default app;
