import { Game } from "./game";
import type { GameRepositoryPort } from "./game.repository.port";
import type { Player } from "./player";

export class GameService {
	constructor(private readonly gameRepository: GameRepositoryPort) {}

	async createGame(players: Player[]) {
		const game = Game.create(players);
		return this.gameRepository.save(game);
	}

	async addScore(gameId: string, score: number) {
		const game = await this.gameRepository.load(gameId);
		game.addScore(score);
		return this.gameRepository.save(game);
	}

	async addFailure(gameId: string) {
		const game = await this.gameRepository.load(gameId);
		game.addFailure();
		return this.gameRepository.save(game);
	}
}
