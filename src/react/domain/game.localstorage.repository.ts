import { Game } from './game'
import type { GameRepositoryPort } from './game.repository.port'

export class GameLocalStorageRepository implements GameRepositoryPort {
  private readonly STORAGE_KEY = '10000-games'

  async save(game: Game): Promise<Game> {
    const games = this.getAllGames()
    games.set(game.id, game)
    this.saveAllGames(games)
    return game
  }

  async load(id: string): Promise<Game> {
    const games = this.getAllGames()
    const game = games.get(id)
    if (!game) {
      throw new Error(`Game with id ${id} not found`)
    }
    return game
  }

  async list(): Promise<Game[]> {
    const games = this.getAllGames()
    return Array.from(games.values())
  }

  async delete(id: string): Promise<void> {
    const games = this.getAllGames()
    games.delete(id)
    this.saveAllGames(games)
  }

  private getAllGames(): Map<string, Game> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return new Map()
      
      const data = JSON.parse(stored)
      const games = new Map<string, Game>()
      
      for (const [id, gameData] of Object.entries(data)) {
        // Reconstruct Game object from stored data
        const game = Object.assign(Object.create(Game.prototype), gameData)
        games.set(id, game)
      }
      
      return games
    } catch (error) {
      console.error('Error loading games from localStorage:', error)
      return new Map()
    }
  }

  private saveAllGames(games: Map<string, Game>): void {
    try {
      const data = Object.fromEntries(games)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving games to localStorage:', error)
    }
  }
}