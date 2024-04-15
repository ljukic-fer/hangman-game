
const initialState = {
    quote: '',
    hiddenQuote: '',
    selectedLetters: new Set(),
    errors: 0,
    gameOver: false,
    timer: 0,
    gameStarted: false
}

const GameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_QUOTE':
            return {
                ...state,
                quote: action.payload
            };
        case 'SET_HIDDEN_QUOTE':
            return {
                ...state,
                hiddenQuote: action.payload
            };
        case 'SET_SELECTED_LETTERS':
            return {
                ...state,
                selectedLetters: action.payload
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.payload
            };
        case 'SET_GAME_OVER':
            return {
                ...state,
                gameOver: action.payload
            };
        case 'SET_TIMER':
            return {
                ...state,
                timer: action.payload
            };
        case 'SET_GAME_STARTED':
            return {
                ...state,
                gameStarted: action.payload
            };
        default:
            return state;
    }
}

export default GameReducer;