import type { Env } from "hono";
import { Game } from "../domain/game";
import type { GameRepositoryPort } from "../domain/game.repository.port";
import { GameNotFoundError } from "./game-not-found.error";

export class KVGameRepository implements GameRepositoryPort {
	constructor(private readonly kv: KVNamespace) {}

	async save(game: Game): Promise<Game> {
		await this.kv.put(game.id, game.serialize());
		return game;
	}
	async load(id: string): Promise<Game> {
		const serializedGame = await this.kv.get(id);
		if (serializedGame === null) {
			throw new GameNotFoundError(id);
		}
		return Game.fromSerialized(serializedGame);
	}

	async list(): Promise<Game[]> {
		const { keys } = await this.kv.list();
		const games = await Promise.all(
			keys.map(async ({ name: id }) => {
				const serializedGame = await this.kv.get(id);
				if (serializedGame === null) {
					throw new GameNotFoundError(id);
				}
				return Game.fromSerialized(serializedGame);
			}),
		);
		return games;
	}
}
