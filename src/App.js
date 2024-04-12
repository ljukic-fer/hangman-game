import './App.css';
import GameScreen from './components/GameScreen';
import HomePage from './components/HomePage';
import { useState } from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);

  const startGame = (passedName) => {
    setName(passedName);
    setStarted(true);
  }


  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        {!started && <HomePage gameStarted={startGame} />}
        {started && <GameScreen username={name}/>}
      </header>
    </div>
    </Provider>
  );
}

export default App;
