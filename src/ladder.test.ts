import { beforeEach, describe, expect, it } from "vitest";
import { Player } from "./player";
import { Ladder } from "./ladder";

describe("Ladder", () => {
	const bob = new Player("Bob");
	let ladder: Ladder;

	beforeEach(() => {
		ladder = new Ladder(bob);
	});

	it("can be created", () => {
		expect(ladder).toBeDefined();
	});

	it("starts with an empty score marks array", () => {
		expect(ladder.scoreMarks).toHaveLength(0);
	});

	it("can add a score", () => {
		ladder.addScore(100);
		expect(ladder.scoreMarks).toHaveLength(1);
	});

	it("can add a failure", () => {
		ladder.addScore(100);
		ladder.addFailure();
		expect(ladder.latestScoreMark.score).toBe(100);
		expect(ladder.latestScoreMark.fails).toBe(1);
	});

	describe("can compute the score", () => {
		it("in an all winning scenario", () => {
			ladder.addScore(100);
			ladder.addScore(100);
			ladder.addScore(100);
			expect(ladder.score).toBe(300);
		});
	});
});
