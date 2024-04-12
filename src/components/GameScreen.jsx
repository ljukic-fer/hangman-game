import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GameScreen = ({ username }) => {
    const [quote, setQuote] = useState('');
    const [hiddenQuote, setHiddenQuote] = useState('');
    const [selectedLetters, setSelectedLetters] = useState(new Set());
    const [errors, setErrors] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(0);
    const [scores, setScores] = useState([])


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
            setQuote(response.data.content);
            setHiddenQuote(hideQuote(response.data.content));
            setGameOver(false);
            setSelectedLetters(new Set());
            setErrors(0);
            setTimer(Date.now());
            fetchScores();
        } catch (error) {
            console.error('Error getting quote: ', error);
        }
    }

    const fetchScores = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores');
            setScores(response.data);
        } catch (error) {
            console.error("Error fetchig highscores: ", error);
        }
    }

    const hideQuote = (quote) => {
        return quote.replace(/[a-zA-Z]/g, '_')
    }

    const handleLetterSelection = (letter) => {
        if (!selectedLetters.has(letter.toLowerCase())) {
            setSelectedLetters(new Set(selectedLetters).add(letter.toLowerCase()))
            revealLetter(letter.toLowerCase())
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

        setHiddenQuote(adjustedHiddenQuote);
        if (!quote.toLowerCase().includes(letter)) setErrors(errors + 1);
        if (quote === adjustedHiddenQuote) {
            setGameOver(true);
            setTimer(Date.now() - timer);
            sendScore();
            fetchScores();
        }
    }


    const sendScore = async () => {
        const score = {
            quoteId: quote.id,
            length: quote.length,
            uniqueCharacters: new Set(quote.toLowerCase().match(/[a-z]/g).size),
            userName: username,
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
            <h1>Hi {username}</h1>
            <h1>Random fetched quote:</h1>
            <p>{timer}</p>
            <p>{new Set(quote.toLowerCase().match(/[a-z]/g)).size}</p>
            {!gameOver &&
                <h2>Errors: {errors}</h2>
            }
            <p>{hiddenQuote}</p>
            {gameOver &&
                <div>
                    <h1>CONGRATS</h1>
                    <p>You finished with {errors} errors</p>
                </div>
            }
            {!gameOver &&
                <div>
                    {keyboardLayout.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.split('').map((letter, colIndex) => (
                                <button key={colIndex} onClick={() => handleLetterSelection(letter)}
                                    style={{ width: '50px', height: '50px', margin: '5px', fontFamily: 'cursive', fontSize: '130%' }}
                                    disabled={selectedLetters.has(letter.toLowerCase())}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    ))}
                    {scores.map(({ id, userName, errors }) => {
                        return <p key={id}>{userName} : {100/(1+errors)}</p>
                    } )}
                </div>
            }
            <button onClick={fetchQuote}>Restart</button>
        </div>
    )
}

export default GameScreen