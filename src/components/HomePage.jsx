import React, { useEffect } from 'react'
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setChars, setCharCounter } from '../redux/actions/HomePageActions'

const HomePage = ({ gameStarted }) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const dispatch = useDispatch();
    const charCounter = useSelector((state) => state.homePage.charCounter)
    const chars = useSelector((state) => state.homePage.chars)
    const name = useSelector((state) => state.homePage.name)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (chars.length < 6) {
                const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                dispatch(setChars(chars + randomLetter));
            } else {
                dispatch(setChars(''));
                dispatch(setCharCounter(charCounter + 1));
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, [chars, charCounter, dispatch]);

    useEffect(() => {
        if (charCounter > 0) {
            setTimeout(() => {
                dispatch(setCharCounter(charCounter - 1));
            }, 500)
        }
    }, [charCounter, dispatch])

    const provideName = () => {
        if (name !== '') {
            dispatch(setName(name))
            console.log(name)
            gameStarted(name)
        }
    }

    const handleNameChange = (e) => {
        const newName = e.target.value.trim();
        dispatch(setName(newName));
    };


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
                    <div id="left-eye" className="text-black text-4xl font-bold transform -translate-x-2 -translate-y-1/2">
                        <div className="spinner animate-spin"></div>
                    </div>
                    <div id="right-eye" className="text-black text-4xl font-bold transform translate-x-2 -translate-y-1/2">
                        <div className="spinner animate-spin"></div>
                    </div>

                </div>
                <div className='mouth-container justify-center transform -translate-y-10'>
                    <div className='mouth'></div>
                </div>
                <div className='flex justify-center items-center text-black text-6xl'>
                    {chars + '_'.repeat(6 - chars.length)}
                </div>
                <div className='flex justify-center items-center text-black text-6xl'>

                    <div>_ _ _ _ _ _ _ </div>
                </div>
            </div>


            <p className={styles.paragraph}>Enter your name here:</p>
            <div>
                <input className='text-md font-normal text-black rounded-lg' type='text' id='name' value={name} onChange={handleNameChange} />
            </div>
            <button className='px-4 py-4 bg-buttonColor rounded-[20px]' onClick={provideName}>Let's hang!</button>
            {name !== '' && <h2 className={styles.paragraph}>Welcome {name}</h2>}
        </div>
    )
}

export default HomePage