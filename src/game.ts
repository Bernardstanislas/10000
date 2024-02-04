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
		this.currentPlayerIndex =
			(this.currentPlayerIndex + 1) % this.ladders.length;
	}

	get currentPlayer() {
		return this.currentLadder.player;
	}

	private get currentLadder() {
		return this.ladders[this.currentPlayerIndex];
	}
}
