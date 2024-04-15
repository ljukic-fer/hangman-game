
const initialState = {
    scores: [],
    loading: false,
    error: null
}

const highScoresReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_SCORES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_SCORES_SUCCESS':
            return {
                ...state,
                loading: false,
                scores: action.payload
            };
        case 'FETCH_SCORES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default highScoresReducer;