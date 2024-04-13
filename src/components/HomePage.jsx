import React, { useState } from 'react'
import styles from '../style';

const HomePage = ( {gameStarted} ) => {
    const [name, setName] = useState('');

    const provideName = () => {
        if (name !== '') {
            gameStarted(name)
        }
    }

  return (
    <div className='container mx-auto p-2'>
        <h2 className={styles.heading2}>
            Welcome to the
        </h2>
        <h1 className={styles.heading1}>
            HANGMAN GAME
        </h1>

        <div className='flex justify-center items-center h-24 w-24 bg-yellow-300 rounded-full'>
        <div class="text-black text-4xl font-bold transform -translate-x-2 -translate-y-1/2">+</div>
            <div class="text-black text-4xl font-bold transform translate-x-2 -translate-y-1/2">+</div>
            
        </div>


        <p className={styles.paragraph}>Enter your name here:</p>
        <div>
        <input className='text-md font-normal text-black' type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button className='px-4 py-4 bg-buttonColor rounded-[20px]' onClick={provideName}>Let's hang!</button>
        {name !== '' && <h2>Welcome {name}</h2>}
    </div>
  )
}

export default HomePage