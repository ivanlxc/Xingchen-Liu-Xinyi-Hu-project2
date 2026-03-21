import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Selection from './pages/Selection';
import GamePage from './pages/GamePage';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';
import Login from './pages/Login';
import Register from './pages/Register';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Selection />} />
            <Route path="/games/normal" element={<GamePage mode="normal" />} />
            <Route path="/games/easy" element={<GamePage mode="easy" />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/scores" element={<HighScores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
