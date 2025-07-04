import { Player } from "./player/player";

type ScoreMark = {
	score: number;
	failures: number;
	cancelled: boolean;
};

const MINIMUM_FIRST_SCORE = 500;
const MAXIMUM_SCORE = 10000;

export class Ladder {
	static create(player: Player) {
		return new Ladder(player);
	}

	static fromObject(ladderObject: ReturnType<Ladder["toObject"]>) {
		return new Ladder(new Player(ladderObject.player), ladderObject.scoreMarks);
	}

	private constructor(
		readonly player: Player,
		readonly scoreMarks: ScoreMark[] = [
			{
				score: 0,
				failures: 0,
				cancelled: false,
			},
		],
	) {}

	toObject() {
		return {
			player: this.player.name,
			scoreMarks: this.scoreMarks,
		};
	}

	addScore(score: number) {
		if (score % 100 !== 0) throw new Error("Score must be a multiple of 100");
		if (score <= 0) throw new Error("Score must be positive");
		if (!this.rolling && score < MINIMUM_FIRST_SCORE)
			throw new Error(`First score must be at least ${MINIMUM_FIRST_SCORE}`);
		const newTotalScore = this.score + score;
		if (newTotalScore > MAXIMUM_SCORE) {
			this.addFailure();
			return;
		}
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

	someoneScored(score: number) {
		if (score !== 0 && score === this.score) {
			this.latestScoreMark.cancelled = true;
		}
	}

	private get rolling() {
		return this.activeScoreMarks.length > 1;
	}

	get score() {
		return this.latestScoreMark?.score || 0;
	}

	get latestScoreMark() {
		return this.activeScoreMarks.slice(-1)[0];
	}

	private get activeScoreMarks() {
		return this.scoreMarks.filter((scoreMark) => !scoreMark.cancelled);
	}
}
