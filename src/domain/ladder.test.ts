import { beforeEach, describe, expect, it } from "vitest";
import { Player } from "./player";
import { Ladder } from "./ladder";

describe("Ladder", () => {
	const bob = new Player("Bob");
	let ladder: Ladder;

	beforeEach(() => {
		ladder = Ladder.create(bob);
	});

	it("can be created", () => {
		expect(ladder).toBeDefined();
	});

	describe("initially", () => {
		it("starts with a 0 filled score marks array", () => {
			expect(ladder.scoreMarks).toHaveLength(1);
		});

		it("has a score of 0", () => {
			expect(ladder.score).toBe(0);
		});

		it("does not count failures on the initial score mark", () => {
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			expect(ladder.latestScoreMark.failures).toBe(0);
		});
	});

	describe("when adding a score", () => {
		it("can add 600", () => {
			ladder.addScore(600);
			expect(ladder.latestScoreMark.score).toBe(600);
		});

		it("can only add hundreds", () => {
			expect(() => ladder.addScore(99)).toThrowError();
		});

		it("cannot add 0 as a score", () => {
			expect(() => ladder.addScore(0)).toThrowError();
		});

		it("cannot add a negative score", () => {
			expect(() => ladder.addScore(-100)).toThrowError();
		});

		it("must add at least 500 on the first score", () => {
			expect(() => ladder.addScore(400)).toThrowError();
		});

		it("must add at least 500 if back to the first score", () => {
			ladder.addScore(1000);
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			expect(() => ladder.addScore(400)).toThrowError();
		});

		it("counts a failure when exceeding 10000", () => {
			ladder.addScore(9500);
			ladder.addScore(600);
			expect(ladder.latestScoreMark.failures).toBe(1);
			expect(ladder.latestScoreMark.score).toBe(9500);
		});
	});

	it("can add a failure", () => {
		ladder.addScore(1000);
		ladder.addFailure();
		expect(ladder.latestScoreMark.score).toBe(1000);
		expect(ladder.latestScoreMark.failures).toBe(1);
	});

	describe("can compute the score", () => {
		it("in an all winning scenario", () => {
			ladder.addScore(1000);
			ladder.addScore(100);
			ladder.addScore(100);
			expect(ladder.score).toBe(1200);
		});

		it("in a mixed scenario", () => {
			ladder.addScore(1000);
			ladder.addScore(100);
			ladder.addFailure();
			ladder.addScore(100);
			ladder.addFailure();
			expect(ladder.score).toBe(1200);
		});

		it("in a mixed scenario with cancelled scores", () => {
			ladder.addScore(1000);
			ladder.addScore(100);
			ladder.addFailure();
			ladder.addFailure();
			ladder.addFailure();
			ladder.addScore(100);
			expect(ladder.score).toBe(1100);
		});
	});

	describe("when someone scores", () => {
		it("has no effect is the score is different", () => {
			ladder.addScore(1000);
			ladder.someoneScored(600);
			expect(ladder.score).toBe(1000);
		});

		it("cancels the score if it is the same", () => {
			ladder.addScore(1000);
			ladder.someoneScored(1000);
			expect(ladder.score).toBe(0);
		});
	});

	it("can be serialized as object", () => {
		const serializedObject = ladder.toObject();
		const newLadder = Ladder.fromObject(serializedObject);
		expect(newLadder).toEqual(ladder);
	});
});
