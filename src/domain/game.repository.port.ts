import type { Game } from "./game";

export type GameRepositoryPort = {
	save(game: Game): Promise<Game>;
	load(id: string): Promise<Game>;
};
