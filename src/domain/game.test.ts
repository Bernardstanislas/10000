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
		game.addScore(300);
		expect(game.currentLadder.score).toBe(800); // Alice has scored previously
	});

	it("can add a failure", () => {
		game.addScore(600); // Bob scores
		game.addScore(700); // Alice scores
		game.addFailure(); // Bob fails
		expect(game.currentLadder.latestScoreMark.failures).toBe(0); // Alice hasn't failed
		game.addScore(100); // Alice scores again
		expect(game.currentLadder.latestScoreMark.failures).toBe(1); // Bob has failed previously
	});

	it("cancels other players' score mark if identical", () => {
		game.addScore(600); // Bob scores
		game.addScore(800); // Alice scores
		game.addScore(200); // Bob scores
		expect(game.currentLadder.score).toBe(0); // Bob has cancelled Alice's initial 800 score
	});

	it("cancels other players' score mark if identical when falling back to a previous score", () => {
		game.addScore(1200); // Bob scores
		game.addScore(900); // Alice scores
		game.addScore(200); // Bob scores
		game.addScore(100); // Alice scores
		game.addFailure(); // Bob fails
		game.addScore(100); // Alice scores
		game.addFailure(); // Bob fails again
		game.addScore(100); // Alice scores
		game.addFailure(); // Bob fails again thrice, falling back to 1200, cancelling Alice's current 1200 score
		expect(game.currentLadder.score).toBe(1100); // Bob has cancelled Alice's 1200, she falls to 1100
	});

	it("finishes when a player reaches 10000", () => {
		game.addScore(1000); // Bob scores
		game.addScore(10000); // Alice scores
		expect(game.finished).toBe(true);
		expect(game.winner).toBe(alice);
	});

	it("can't add a score after the game has finished", () => {
		game.addScore(10000); // Bob scores
		expect(() => game.addScore(1000)).toThrowError();
		expect(() => game.addFailure()).toThrowError();
	});
});
