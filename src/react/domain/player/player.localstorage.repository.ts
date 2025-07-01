import { Player } from './player'
import type { PlayerRepositoryPort, PlayerId } from './player.repository.port'

export class PlayerLocalStorageRepository implements PlayerRepositoryPort {
  private readonly STORAGE_KEY = '10000-players'

  async findAll(): Promise<Player[]> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) {
        // Return default players if none stored
        return this.getDefaultPlayers()
      }
      
      const data = JSON.parse(stored)
      return data.map((playerData: any) => 
        Object.assign(Object.create(Player.prototype), playerData)
      )
    } catch (error) {
      console.error('Error loading players from localStorage:', error)
      return this.getDefaultPlayers()
    }
  }

  async savePlayer(player: Player): Promise<PlayerId> {
    const players = await this.findAll()
    const existingIndex = players.findIndex(p => p.name === player.name)
    
    if (existingIndex >= 0) {
      players[existingIndex] = player
    } else {
      players.push(player)
    }
    
    this.saveAllPlayers(players)
    return player.name
  }

  async loadPlayer(id: PlayerId): Promise<Player> {
    const players = await this.findAll()
    const player = players.find(p => p.name === id)
    if (!player) {
      throw new Error(`Player with id ${id} not found`)
    }
    return player
  }

  private getDefaultPlayers(): Player[] {
    return [
      new Player('Alice'),
      new Player('Bob'), 
      new Player('Charlie'),
      new Player('David'),
      new Player('Eve'),
      new Player('Frank'),
      new Player('Grace'),
      new Player('Henry')
    ]
  }

  private saveAllPlayers(players: Player[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(players))
    } catch (error) {
      console.error('Error saving players to localStorage:', error)
    }
  }
}