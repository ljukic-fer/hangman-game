import axios from "axios";

export const fetchScoresRequest = () => ({
    type: 'FETCH_SCORES_REQUEST'
})

export const fetchScoresSuccess = (scores) => ({
    type: 'FETCH_SCORES_SUCCESS',
    payload: scores
})

export const fetchScoresFailure = (error) => ({
    type: 'FETCH_SCORES_FAILURE',
    payload: error
});

export const fetchScores = () => {
    return async (dispatch) => {
        dispatch(fetchScoresRequest());
        try {
            const response = await axios.get('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores');
            dispatch(fetchScoresSuccess(response.data));
        } catch (error) {
            dispatch(fetchScoresFailure(error.message));
        }
    }
}