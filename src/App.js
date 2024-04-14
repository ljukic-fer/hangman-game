import './App.css';
import GameScreen from './components/GameScreen';
import HomePage from './components/HomePage';
import { useState } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import HighScores from './components/HighScores';

function App() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState(0);

  const startGame = (passedName) => {
    setName(passedName);
    setStarted(true);
  }

  const endGame = (errors) => {
    setFinished(true);
    setErrors(errors);
  }

  const newGame = () => {
    setFinished(false);
  }


  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header bg-gradient-to-br from-teal-400 to-violet-400">
        {!started && !finished && <HomePage gameStarted={startGame} />}
        {started && !finished && <GameScreen username={name} gameEnded={endGame}/>}
        {started && finished && <HighScores user={name} errs={errors} gameRestarted={newGame}/>}
      </header>
    </div>
    </Provider>
  );
}

export default App;
