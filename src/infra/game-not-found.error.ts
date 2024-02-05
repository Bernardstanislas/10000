export class GameNotFoundError extends Error {
	constructor(id: string) {
		super(`Game not found: ${id}`);
	}
}
