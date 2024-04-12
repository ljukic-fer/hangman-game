import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighScores = ( {user, errs} ) => {
    const [scores, setScores] = useState([]);    

    useEffect (() => {
        fetchScores();
    },[])
    const fetchScores = async () => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores');
            setScores(response.data);
        } catch (error) {
            console.error("Error fetchig highscores: ", error);
        }
    }

    return (
        <div>
            <h1>Congratulations, {user}!</h1>
            <h2>You finished the game with {errs} errors</h2>
            <h1>
                HighScores
            </h1>
            {scores.map(({ id, userName, errors }) => {
                return <p key={id}>{userName} : {100 / (1 + errors)}</p>
            })}
        </div>
    )
}

export default HighScores