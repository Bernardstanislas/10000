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

	it("can add a score", () => {
		game.addScore(600);
		expect(game.currentLadder.score).toBe(0); // Alice hasn't scored yet
		game.addScore(800);
		expect(game.currentLadder.score).toBe(600); // Bob has scored previously
		game.addScore(200);
		expect(game.currentLadder.score).toBe(800); // Alice has again
	});

	it("can add a failure", () => {
		game.addScore(600); // Bob scores
		game.addScore(700); // Alice scores
		game.addFailure(); // Bob fails
		expect(game.currentLadder.latestScoreMark.failures).toBe(0); // Alice hasn't failed
		game.addScore(100); // Alice scores again
		expect(game.currentLadder.latestScoreMark.failures).toBe(1); // Bob has failed previously
	});
});
