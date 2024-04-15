
const initialState = {
    started: false,
    finished: false,
    errors: 0,
    username: ''
}

const gameReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'NEW_GAME':
            return {...initialState};
        case 'START_GAME':
            return {...state, started: true, username: action.payload};
        case 'END_GAME':
            return {...state, finished: true, errors: action.payload}
        default:
            return state;
    }
}

export default gameReducer;