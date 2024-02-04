import { beforeEach, describe, expect, it } from "vitest";
import { Player } from "./player";
import { Game } from "./game";

describe("Game", () => {
	const bob = new Player("Bob");
	const alice = new Player("Alice");
	let game: Game;

	beforeEach(() => {
		game = new Game([bob, alice]);
	});

	it("initiates player ladders", () => {
		expect(game.ladders).toHaveLength(2);
	});

	it("tracks the currently playing player", () => {
		expect(game.currentPlayer).toBe(bob);
	});

	it("can switch to the next player", () => {
		game.addScore(600);
		expect(game.currentPlayer).toBe(alice);
		game.addScore(800);
		expect(game.currentPlayer).toBe(bob);
	});
});
