import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function GameView() {
  const { id } = useParams<{ id: string }>()
  const [score, setScore] = useState(100)
  const [gameState] = useState({
    players: ['Alice', 'Bob', 'Charlie'],
    currentPlayer: 0,
    scores: [
      { player: 'Alice', scores: [1000, 500], total: 1500 },
      { player: 'Bob', scores: [800], total: 800 },
      { player: 'Charlie', scores: [], total: 0 }
    ]
  })

  const handleScore = () => {
    console.log(`Adding score: ${score}`)
    // TODO: Implement scoring logic
  }

  const handleFailure = () => {
    console.log('Recording failure')
    // TODO: Implement failure logic
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Games
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Game {id}
      </h1>

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
              {gameState.scores.map((playerScore, index) => (
                <tr 
                  key={playerScore.player}
                  className={index === gameState.currentPlayer ? 'bg-blue-50' : ''}
                >
                  <td className="font-medium">
                    {playerScore.player}
                    {index === gameState.currentPlayer && ' (current)'}
                  </td>
                  <td>
                    {playerScore.scores.length > 0 
                      ? playerScore.scores.join(', ')
                      : '—'
                    }
                  </td>
                  <td className="font-bold">
                    {playerScore.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {gameState.players[gameState.currentPlayer]}'s Turn
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
            />
          </div>
          
          <div className="flex gap-x-2">
            <button
              onClick={handleScore}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Score
            </button>
            <button
              onClick={handleFailure}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Failure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameView