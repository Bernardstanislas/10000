import { Ladder } from "./ladder";
import type { Player } from "./player";
import { v4 } from "uuid";

export class Game {
	static create(players: Player[]) {
		const ladders = players.map((player) => new Ladder(player));
		return new Game(ladders);
	}

	private constructor(
		readonly ladders: Ladder[],
		readonly id: string = v4(),
		private currentPlayerIndex = 0,
	) {}

	addScore(score: number) {
		this.checkForFinishedGame();
		this.currentLadder.addScore(score);
		this.notifyOtherPlayersOfNewScore();
		this.cyclePlayers();
	}

	addFailure() {
		this.checkForFinishedGame();
		this.currentLadder.addFailure();
		this.notifyOtherPlayersOfNewScore();
		this.cyclePlayers();
	}

	get currentPlayer() {
		return this.currentLadder.player;
	}

	get currentLadder() {
		return this.ladders[this.currentPlayerIndex];
	}

	get finished() {
		return this.ladders.some((ladder) => ladder.score === 10000);
	}

	get winner() {
		return this.ladders.find((ladder) => ladder.score === 10000)?.player;
	}

	private cyclePlayers() {
		this.currentPlayerIndex =
			(this.currentPlayerIndex + 1) % this.ladders.length;
	}

	private checkForFinishedGame() {
		if (this.finished) {
			throw new Error("Game has finished");
		}
	}

	private notifyOtherPlayersOfNewScore() {
		for (const ladder of this.ladders) {
			if (ladder === this.currentLadder) continue;
			ladder.someoneScored(this.currentLadder.score);
		}
	}
}
