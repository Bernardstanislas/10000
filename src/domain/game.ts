import { Ladder } from "./ladder";
import type { Player } from "./player";

export class Game {
	readonly ladders: Ladder[];
	private currentPlayerIndex = 0;

	constructor(players: Player[]) {
		this.ladders = players.map((player) => new Ladder(player));
	}

	addScore(score: number) {
		this.currentLadder.addScore(score);
		for (const ladder of this.ladders) {
			if (ladder === this.currentLadder) continue;
			ladder.someoneScored(this.currentLadder.score);
		}
		this.cyclePlayers();
	}

	addFailure() {
		this.currentLadder.addFailure();
		this.cyclePlayers();
	}

	get currentPlayer() {
		return this.currentLadder.player;
	}

	get currentLadder() {
		return this.ladders[this.currentPlayerIndex];
	}

	private cyclePlayers() {
		this.currentPlayerIndex =
			(this.currentPlayerIndex + 1) % this.ladders.length;
	}
}
