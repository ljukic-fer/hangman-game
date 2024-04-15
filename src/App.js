import './App.css';
import GameScreen from './components/GameScreen';
import HomePage from './components/HomePage';
import store from './redux/store';
import { Provider } from 'react-redux';
import HighScores from './components/HighScores';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from './redux/actions/HomePageActions';
import { setErrors, setGameStarted, setGameOver } from './redux/actions/GameActions';

function App() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.homePage.name);
  const errors = useSelector((state) => state.game.errors);
  const gameStarted = useSelector((state) => state.game.gameStarted);
  const gameOver = useSelector((state) => state.game.gameOver);

  const startGame = (passedName) => {
    dispatch(setName(passedName));
    dispatch(setGameStarted(true));
  }

  const endGame = (errors) => {
    dispatch(setGameOver(true));
    dispatch(setErrors(errors));
  }

  const newGame = () => {
    dispatch(setGameOver(false));
  }


  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header bg-gradient-to-br from-teal-400 to-violet-400">
        {!gameStarted && !gameOver && <HomePage gameStarted={startGame} />}
        {gameStarted && !gameOver && <GameScreen username={name} gameEnded={endGame}/>}
        {gameStarted && gameOver && <HighScores user={name} errs={errors} gameRestarted={newGame}/>}
      </header>
    </div>
    </Provider>
  );
}

export default App;
