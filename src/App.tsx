import RPLogo2 from './assets/RPLogo2.png';
import React, { useState } from 'react';
import './styles.css';



export default function App() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const numGuess = Number(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a valid number between 1 and 100.');
      return;
    }
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (numGuess === target) {
      setMessage(`Correct! You guessed in ${newAttempts} attempts.`);
      setGameOver(true);
      if (typeof window.sendDataToGameLab === 'function') {
        window.sendDataToGameLab({
          event: 'gameOver',
          attempts: newAttempts,
          target,
          timestamp: new Date().toISOString()
        });
      }
    } else if (numGuess < target) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
    setGuess('');
  };

  const handleReset = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTarget(newTarget);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <img src={RPLogo2} alt="Game Logo" className="logo" />
      <h1>Number Guessing Game</h1>
      <p className="message">{message}</p>
      <div className="input-container">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess} disabled={gameOver}>Guess</button>
      </div>
      {gameOver && (
        <button className="reset-button" onClick={handleReset}>
          Play Again
        </button>
      )}
      <p className="attempts">Attempts: {attempts}</p>
    </div>
  );
}