import type { Player } from "./player";

type ScoreMark = {
	score: number;
	fails: number;
	cancelled: boolean;
};

export class Ladder {
	readonly scoreMarks: ScoreMark[] = [];

	constructor(readonly player: Player) {}

	addScore(score: number) {
		if (score % 100 !== 0) throw new Error("Score must be a multiple of 100");
		this.scoreMarks.push({ score, fails: 0, cancelled: false });
	}

	addFailure() {
		this.latestScoreMark.fails++;
	}

	get score() {
		return this.scoreMarks.reduce((acc, scoreMark) => acc + scoreMark.score, 0);
	}

	get latestScoreMark() {
		const activeScoreMarks = this.scoreMarks.filter(
			(scoreMark) => !scoreMark.cancelled,
		);
		return activeScoreMarks[activeScoreMarks.length - 1];
	}
}
