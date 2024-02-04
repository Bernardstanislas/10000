import type { Player } from "./player";

type ScoreMark = {
	score: number;
	failures: number;
	cancelled: boolean;
};

export class Ladder {
	readonly scoreMarks: ScoreMark[] = [];

	constructor(readonly player: Player) {}

	addScore(score: number) {
		if (score % 100 !== 0) throw new Error("Score must be a multiple of 100");
		if (score <= 0) throw new Error("Score must be positive");
		const newTotalScore = this.score + score;
		this.scoreMarks.push({
			score: newTotalScore,
			failures: 0,
			cancelled: false,
		});
	}

	addFailure() {
		this.latestScoreMark.failures++;
		if (this.latestScoreMark.failures === 3) {
			this.latestScoreMark.cancelled = true;
		}
	}

	get score() {
		return this.latestScoreMark?.score || 0;
	}

	get latestScoreMark() {
		return this.scoreMarks
			.filter((scoreMark) => !scoreMark.cancelled)
			.slice(-1)[0];
	}
}
