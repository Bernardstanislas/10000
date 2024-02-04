import type { Game } from "../domain/game";
import type { GameRepositoryPort } from "../domain/game.repository.port";

export class InMemoryGameRepository implements GameRepositoryPort {
	private readonly games: Map<string, Game> = new Map();

	async save(game: Game): Promise<Game> {
		this.games.set(game.id, game);
		return game;
	}

	async load(id: string): Promise<Game> {
		const game = this.games.get(id);
		if (game === undefined) {
			throw new Error(`Game not found: ${id}`);
		}
		return game;
	}
}
