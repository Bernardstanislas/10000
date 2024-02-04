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
		this.scoreMarks.push({ score, fails: 0, cancelled: false });
	}

	get score() {
		return this.scoreMarks.reduce((acc, scoreMark) => acc + scoreMark.score, 0);
	}

	private get latestScoreMark() {
		const activeScoreMarks = this.scoreMarks.filter(
			(scoreMark) => !scoreMark.cancelled,
		);
		return activeScoreMarks[activeScoreMarks.length - 1];
	}
}
