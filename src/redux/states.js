const initialState = {
    quote: '',
    hiddenQuote: '',
    selectedLetters: new Set(),
    errors: 0,
    gameOver: false,
    highScores: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default rootReducer