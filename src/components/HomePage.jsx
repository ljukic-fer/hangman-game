import React, { useEffect, useState } from 'react'
import styles from '../style';

const HomePage = ({ gameStarted }) => {
    const [name, setName] = useState('');
    const [xChars, setXChars] = useState('______');
    const [resetChars, setResetChars] = useState(0);
    const [usedIndexes, setUsedIndexes] = useState([]);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (xChars.length<6) {
                const randomLetter = letters[Math.floor(Math.random()*letters.length)];
                setXChars(prevChars => prevChars + randomLetter);
            } else {
                setXChars('');
                setResetChars(prevCounter => prevCounter + 1);
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [xChars]);

    useEffect(() => {
        if (resetChars>0) {
            setTimeout(() => {
                setResetChars(prevCounter => prevCounter - 1)
            }, 500)
        }
    }, [resetChars])

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

            <div className='flex flex-col items-center'>
                <div className='flex justify-center items-center h-24 w-24 bg-yellow-300 rounded-full'>
                    <div id="left-eye" class="text-black text-4xl font-bold transform -translate-x-2 -translate-y-1/2">
                    <div class="spinner animate-spin"></div>
                    </div>
                    <div id="right-eye" class="text-black text-4xl font-bold transform translate-x-2 -translate-y-1/2">
                    <div class="spinner animate-spin"></div>
                    </div>

                </div>
                <div className='mouth-container justify-center transform -translate-y-10'>
                    <div className='mouth'></div>
                </div>
                <div className='flex justify-center items-center text-black text-6xl'>
                    {xChars + '_'.repeat(6-xChars.length)}
                </div>
                <div className='flex justify-center items-center text-black text-6xl'>
                    
                    <div>_ _ _ _ _ _ _ </div>
                </div>
            </div>


            <p className={styles.paragraph}>Enter your name here:</p>
            <div>
                <input className='text-md font-normal text-black rounded-lg' type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button className='px-4 py-4 bg-buttonColor rounded-[20px]' onClick={provideName}>Let's hang!</button>
            {name !== '' && <h2 className={styles.paragraph}>Welcome {name}</h2>}
        </div>
    )
}

export default HomePage