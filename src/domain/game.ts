import { Ladder } from "./ladder";
import type { Player } from "./player";
import { v4 } from "uuid";

export class Game {
	readonly ladders: Ladder[];
	private currentPlayerIndex = 0;
	readonly id: string;

	constructor(players: Player[]) {
		this.ladders = players.map((player) => new Ladder(player));
		this.id = v4();
	}

	addScore(score: number) {
		this.checkForFinishedGame();
		this.currentLadder.addScore(score);
		for (const ladder of this.ladders) {
			if (ladder === this.currentLadder) continue;
			ladder.someoneScored(this.currentLadder.score);
		}
		this.cyclePlayers();
	}

	addFailure() {
		this.checkForFinishedGame();
		this.currentLadder.addFailure();
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
}
