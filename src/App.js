import logo from './logo.svg';
import './App.css';
import GameScreen from './components/GameScreen';
import HomePage from './components/HomePage';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);

  const startGame = (passedName) => {
    setName(passedName);
    setStarted(true);
  }


  return (
    <div className="App">
      <header className="App-header">
        {!started && <HomePage gameStarted={startGame} />}
        {started && <GameScreen />}
      </header>
    </div>
  );
}

export default App;
