
const initialState = {
    name: '',
    guessedLetters: new Set()
}

const usernameReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload};
        case 'ADD_GUESSED_LETTER':
            return {
                ...state,
                guessedLetters: new Set([...state.guessedLetters, action.payload])
            };
        default:
            return state;
    }
}

export default usernameReducer;