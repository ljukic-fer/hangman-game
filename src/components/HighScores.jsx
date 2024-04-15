import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../redux/actions/HighScoresActions';
import styles from '../style';

const HighScores = ({ user, errs, gameRestarted }) => {

    const dispatch = useDispatch();
    const { scores, loading, error } = useSelector((state) => state.highScores)

    useEffect(() => {
        dispatch(fetchScores());
    }, [dispatch])


    const newGame = () => {
        gameRestarted(user);
    }

    const sortedScores = [...scores].sort((a, b) => {
        const scoreA = 100 / (1 + a.errors);
        const scoreB = 100 / (1 + b.errors);
        if (scoreB < scoreA) return -1;
        return null
    })

    return (
        <div className='container mx-auto p-2'>
            <h1 className={styles.heading1}>Congratulations, {user}!</h1>
            <h2 className={styles.heading2}>You finished the game with {errs} errors.</h2>
            <h2 className={styles.heading2}>Your score is {Math.round(100000 / (1 + errs)) / 1000}</h2>
            <button className='px-4 py-4 bg-buttonColor rounded-[20px] hover:bg-red-950 my-10' onClick={newGame}>New game</button>
            <h1 className={`${styles.heading2} my-10`}>
                HighScores
            </h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: cannot fetch highscores</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <tbody className=''>
                    {sortedScores.map((score, index) => (
                        <tr key={score.id}>
                            <td>{index + 1}</td>
                            <td>{score.userName}</td>
                            <td>{Math.round(100000 / (1 + score.errors)) / 1000}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HighScores