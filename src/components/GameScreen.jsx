import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GameScreen = () => {
    const [quote, setQuote] = useState('');
    const [hiddenQuote, setHiddenQuote] = useState('');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.quotable.io/random');
                setQuote(response.data.content);
                setHiddenQuote(hideQuote(response.data.content));
            } catch (error) {
                console.error('Error getting quote: ', error);
            }
        }

        fetchQuote();
    }, []);

    const hideQuote = (quote) => {
        return quote.replace(/a/g, '_')
    }
  return (
    <div>
        <h1>Random fetched quote:</h1>
        <p>{quote}</p>
        <p>{hiddenQuote}</p>
        <button onClick={() => window.location.href='/'}>Restart</button>
    </div>
  )
}

export default GameScreen