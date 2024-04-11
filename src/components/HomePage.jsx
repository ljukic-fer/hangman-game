import React, { useState } from 'react'

const HomePage = ( {gameStarted} ) => {
    const [name, setName] = useState('');

    const provideName = () => {
        if (name !== '') {
            gameStarted(name)
        }
    }

  return (
    <div>
        <h2>
            Welcome to the
        </h2>
        <h1>
            HANGMAN GAME
        </h1>
        <p>Enter your name here:</p>
        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={provideName}>Let's hang!</button>
        {name !== '' && <h2>Welcome {name}</h2>}
    </div>
  )
}

export default HomePage