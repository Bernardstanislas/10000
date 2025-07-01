import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGameService } from '../hooks/useGameService'

function Home() {
  const navigate = useNavigate()
  const { games, players, loading, error, createGame, clearError } = useGameService()
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handlePlayerToggle = (playerName: string) => {
    setSelectedPlayers(prev => 
      prev.includes(playerName)
        ? prev.filter(name => name !== playerName)
        : [...prev, playerName]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (selectedPlayers.length < 2) {
      alert('Please select at least 2 players')
      return
    }

    try {
      setSubmitting(true)
      const game = await createGame(selectedPlayers)
      navigate(`/games/${game.id}`)
    } catch (err) {
      // Error is handled by the hook
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl p-4 text-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">10000 Game</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button onClick={clearError} className="ml-2 text-sm underline">
            Dismiss
          </button>
        </div>
      )}
      
      {/* Game List */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Active Games</h2>
        {games.length === 0 ? (
          <p className="text-gray-600">No games yet. Create your first game!</p>
        ) : (
          <div className="space-y-2">
            {games.map(game => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded border"
              >
                <div className="font-medium">
                  Game with {game.ladders.map(l => l.player.name).join(', ')}
                </div>
                <div className="text-sm text-gray-500">
                  Current Turn: {game.currentPlayer.name}
                  {game.finished && ` | Winner: ${game.winner?.name}`}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Game Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create New Game</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Players ({selectedPlayers.length} selected):
            </label>
            <div className="grid grid-cols-2 gap-2">
              {players.map(player => (
                <label key={player.name} className="flex items-center">
                  <input
                    type="checkbox"
                    value={player.name}
                    checked={selectedPlayers.includes(player.name)}
                    onChange={() => handlePlayerToggle(player.name)}
                    className="mr-2"
                  />
                  {player.name}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || selectedPlayers.length < 2}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            {submitting ? 'Creating...' : 'Create Game'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home