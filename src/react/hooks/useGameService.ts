import { useState, useEffect } from 'react'
import { Game } from '../domain/game'
import { GameService } from '../domain/game.service'
import { GameLocalStorageRepository } from '../domain/game.localstorage.repository'
import { PlayerLocalStorageRepository } from '../domain/player/player.localstorage.repository'
import { Player } from '../domain/player/player'

const gameRepository = new GameLocalStorageRepository()
const playerRepository = new PlayerLocalStorageRepository()
const gameService = new GameService(gameRepository)

export function useGameService() {
  const [games, setGames] = useState<Game[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [gamesData, playersData] = await Promise.all([
        gameRepository.list(),
        playerRepository.findAll()
      ])
      setGames(gamesData)
      setPlayers(playersData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const createGame = async (selectedPlayers: string[]) => {
    try {
      const playerObjects = selectedPlayers.map(name => new Player(name))
      const game = await gameService.createGame(playerObjects)
      setGames(prev => [...prev, game])
      return game
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game')
      throw err
    }
  }

  const getGame = async (id: string) => {
    try {
      const game = await gameRepository.load(id)
      return game
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get game')
      throw err
    }
  }

  const addScore = async (gameId: string, score: number) => {
    try {
      const game = await gameService.addScore(gameId, score)
      
      // Update games list
      setGames(prev => prev.map(g => g.id === gameId ? game : g))
      
      return game
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add score')
      throw err
    }
  }

  const recordFailure = async (gameId: string) => {
    try {
      const game = await gameService.addFailure(gameId)
      
      // Update games list
      setGames(prev => prev.map(g => g.id === gameId ? game : g))
      
      return game
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record failure')
      throw err
    }
  }

  const clearError = () => setError(null)

  return {
    games,
    players,
    loading,
    error,
    createGame,
    getGame,
    addScore,
    recordFailure,
    clearError,
    refreshGames: loadInitialData
  }
}