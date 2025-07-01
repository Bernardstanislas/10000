import type { Player } from "./player";

export type PlayerId = string;

export type PlayerRepositoryPort = {
	savePlayer(player: Player): Promise<PlayerId>;
	loadPlayer(id: PlayerId): Promise<Player>;
};
