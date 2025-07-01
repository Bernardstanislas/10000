import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameView from './pages/GameView'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<GameView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App