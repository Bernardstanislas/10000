import type { Player } from "./player";

export class Ladder {
	readonly scoreMarks: number[] = [];

	constructor(readonly player: Player) {}
}
