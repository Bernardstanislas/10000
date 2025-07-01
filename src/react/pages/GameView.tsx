import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGameService } from '../hooks/useGameService'
import { Game } from '../domain/game'

function GameView() {
  const { id } = useParams<{ id: string }>()
  const { getGame, addScore, recordFailure, error, clearError } = useGameService()
  const [game, setGame] = useState<Game | null>(null)
  const [score, setScore] = useState(100)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      loadGame(id)
    }
  }, [id])

  const loadGame = async (gameId: string) => {
    try {
      setLoading(true)
      const gameData = await getGame(gameId)
      setGame(gameData)
    } catch (err) {
      // Error handled by the hook
    } finally {
      setLoading(false)
    }
  }

  const handleScore = async () => {
    if (!game || !id) return
    
    try {
      setSubmitting(true)
      const updatedGame = await addScore(id, score)
      setGame(updatedGame)
    } catch (err) {
      // Error handled by the hook
    } finally {
      setSubmitting(false)
    }
  }

  const handleFailure = async () => {
    if (!game || !id) return
    
    try {
      setSubmitting(true)
      const updatedGame = await recordFailure(id)
      setGame(updatedGame)
    } catch (err) {
      // Error handled by the hook
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl p-4 text-center">
        <div className="text-lg">Loading game...</div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="container mx-auto max-w-3xl p-4 text-center">
        <div className="text-lg text-red-600">Game not found</div>
        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
          ← Back to Games
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Games
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Game {game.id.slice(0, 8)}...
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={clearError} className="ml-2 text-sm underline">
            Dismiss
          </button>
        </div>
      )}

      {game.finished && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          🎉 Game Finished! Winner: {game.winner?.name} 🎉
        </div>
      )}

      {/* Score Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Scores</h2>
        <div className="overflow-x-auto">
          <table className="table-auto border-separate border-spacing-y-4 min-w-full">
            <thead>
              <tr>
                <th className="text-left font-medium text-gray-700">Player</th>
                <th className="text-left font-medium text-gray-700">Scores</th>
                <th className="text-left font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {game.ladders.map((ladder) => (
                <tr 
                  key={ladder.player.name}
                  className={ladder.player.name === game.currentPlayer.name ? 'bg-blue-50' : ''}
                >
                  <td className="font-medium">
                    {ladder.player.name}
                    {ladder.player.name === game.currentPlayer.name && ' (current)'}
                  </td>
                  <td>
                    {ladder.scoreMarks.length > 1
                      ? ladder.scoreMarks.slice(1).map(mark => mark.score).join(', ')
                      : '—'
                    }
                  </td>
                  <td className="font-bold">
                    {ladder.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controls */}
      {!game.finished && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {game.currentPlayer.name}'s Turn
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score: {score}
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full"
                disabled={submitting}
              />
            </div>
            
            <div className="flex gap-x-2">
              <button
                onClick={handleScore}
                disabled={submitting}
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
              >
                {submitting ? 'Adding...' : 'Add Score'}
              </button>
              <button
                onClick={handleFailure}
                disabled={submitting}
                className="bg-red-500 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
              >
                {submitting ? 'Recording...' : 'Failure'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameView