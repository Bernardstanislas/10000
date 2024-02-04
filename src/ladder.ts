import type { Player } from "./player";

type ScoreMark = {
	score: number;
	failures: number;
	cancelled: boolean;
};

const MINIMUM_FIRST_SCORE = 500;

export class Ladder {
	readonly scoreMarks: ScoreMark[] = [
		{
			score: 0,
			failures: 0,
			cancelled: false,
		},
	];

	constructor(readonly player: Player) {}

	addScore(score: number) {
		if (score % 100 !== 0) throw new Error("Score must be a multiple of 100");
		if (score <= 0) throw new Error("Score must be positive");
		if (!this.rolling && score < MINIMUM_FIRST_SCORE)
			throw new Error(`First score must be at least ${MINIMUM_FIRST_SCORE}`);

		const newTotalScore = this.score + score;
		this.scoreMarks.push({
			score: newTotalScore,
			failures: 0,
			cancelled: false,
		});
	}

	addFailure() {
		if (!this.rolling) return; // ignore failures on the initial score mark
		this.latestScoreMark.failures++;
		if (this.latestScoreMark.failures === 3) {
			this.latestScoreMark.cancelled = true;
		}
	}

	private get rolling() {
		return this.scoreMarks.length > 1;
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
