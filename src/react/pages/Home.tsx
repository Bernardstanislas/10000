import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [games] = useState([
    { id: '1', players: ['Alice', 'Bob'], createdAt: new Date() },
    { id: '2', players: ['Charlie', 'David', 'Eve'], createdAt: new Date() }
  ])

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">10000 Game</h1>
      
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
                  Game with {game.players.join(', ')}
                </div>
                <div className="text-sm text-gray-500">
                  Created {game.createdAt.toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Game Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create New Game</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Players:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Alice', 'Bob', 'Charlie', 'David', 'Eve'].map(name => (
                <label key={name} className="flex items-center">
                  <input
                    type="checkbox"
                    value={name}
                    className="mr-2"
                  />
                  {name}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home