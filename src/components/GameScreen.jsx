import React, { useEffect } from 'react'
import axios from 'axios';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { setQuote, setHiddenQuote, setSelectedLetters, setGameOver, setErrors, setTimer } from '../redux/actions/GameActions';

const GameScreen = ({ gameEnded}) => {
    const dispatch = useDispatch();

    const name = useSelector((state) => state.homePage.name);
    const quote = useSelector((state) => state.game.quote);
    const hiddenQuote = useSelector((state) => state.game.hiddenQuote);
    const selectedLetters = useSelector((state) => state.game.selectedLetters);
    const gameOver = useSelector((state) => state.game.gameOver);
    const errors = useSelector((state) => state.game.errors);
    const timer = useSelector((state) => state.game.timer);

    const keyboardLayout = [
        'QWERTZUIOP',
        'ASDFGHJKL',
        'YXCVBNM'
    ]

    useEffect(() => {
        fetchQuote();
        //eslint-disable-next-line
    }, []);

    const fetchQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            dispatch(setQuote(response.data.content));
            dispatch(setHiddenQuote(hideQuote(response.data.content)));
            dispatch(setGameOver(false));
            dispatch(setSelectedLetters(new Set()));
            dispatch(setErrors(0));
            dispatch(setTimer(Date.now()));
        } catch (error) {
            console.error('Error getting quote: ', error);
        }
    }

    const hideQuote = (quote) => {
        return quote.replace(/[a-zA-Z]/g, '_')
    }

    const handleLetterSelection = (letter) => {
        if (!selectedLetters.has(letter.toLowerCase())) {
            dispatch(setSelectedLetters(new Set(selectedLetters).add(letter.toLowerCase())));
            revealLetter(letter.toLowerCase());
        }
    }

    const revealLetter = (letter) => {
        var adjustedHiddenQuote = quote.toLowerCase().split('')
            .map((char, index) => {
                if (char === letter
                    || selectedLetters.has(char.toLowerCase())
                    || char.toUpperCase() === char.toLowerCase()) {
                    return quote[index]
                } else if (char === ' ') {
                    return ' '
                } else {
                    return '_'
                }
            })
            .join('');

        dispatch(setHiddenQuote(adjustedHiddenQuote));
        if (!quote.toLowerCase().includes(letter)) dispatch(setErrors(errors + 1));
        if (quote === adjustedHiddenQuote) {
            dispatch(setGameOver(true));
            dispatch(setTimer(Date.now() - timer));
            sendScore();
            gameEnded(errors);
        }
    }


    const sendScore = async () => {
        const score = {
            quoteId: quote.id,
            length: quote.length,
            uniqueCharacters: new Set(quote.toLowerCase().match(/[a-z]/g).size),
            userName: name,
            errors: errors,
            duration: timer
        }

        try {
            await axios.post('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores',
                score, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        } catch (error) {
            console.error("Error sending data: ", error);
        }
    }

    return (
        <div>
            <h1 className={styles.heading2}>Welcome {name}</h1>
            <h1>Random fetched quote:</h1>
            {!gameOver &&
                <h2 className={styles.heading2}>Errors: {errors}</h2>
            }
            <p className={styles.paragraph}>{hiddenQuote}</p>
            {gameOver &&
                <div>
                    <h1>CONGRATS</h1>
                    <p>You finished with {errors} errors</p>
                </div>
            }
            {!gameOver &&
                <div>
                    {keyboardLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.paragraph}>
                            {row.split('').map((letter, colIndex) => (
                                <button key={colIndex}
                                        className={selectedLetters.has(letter.toLowerCase()) ? styles.selectedKey : styles.defaultKey}
                                        onClick={() => handleLetterSelection(letter)}
                                        style={{ width: '50px', height: '50px', margin: '5px', fontFamily: 'cursive', fontSize: '130%' }}
                                        disabled={selectedLetters.has(letter.toLowerCase())}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            }
            <button onClick={fetchQuote}>Restart</button>
        </div>
    )
}

export default GameScreen