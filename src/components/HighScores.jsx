import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../redux/actions/HighScoresActions';

const HighScores = ({ user, errs, gameRestarted }) => {

    const dispatch = useDispatch();
    const { scores, loading, error } = useSelector((state) => state.highScores)

    useEffect(() => {
        dispatch(fetchScores());
    }, [dispatch])


    const newGame = () => {
        gameRestarted(user);
    }

    return (
        <div>
            <h1>Congratulations, {user}!</h1>
            <h2>You finished the game with {errs} errors</h2>
            <button onClick={newGame}>New game</button>
            <h1>
                HighScores
            </h1>
            <ul>
                {scores.map((score) => (
                    <li key={score.id}>
                        {score.userName}: {100 / (1 + score.errors)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HighScores