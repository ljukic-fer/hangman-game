export const setQuote = (quote) => ({
    type: 'SET_QUOTE',
    payload: quote
})

export const setHiddenQuote = (hiddenQuote) => ({
    type: 'SET_HIDDEN_QUOTE',
    payload: hiddenQuote
})

export const setSelectedLetters = (selectedLetters) => ({
    type: 'SET_SELECTED_LETTERS',
    payload: selectedLetters
})

export const setErrors = (errors) => ({
    type: 'SET_ERRORS',
    payload: errors
})

export const setGameOver = (gameOver) => ({
    type: 'SET_GAME_OVER',
    payload: gameOver
})

export const setTimer = (timer) => ({
    type: 'SET_TIMER',
    payload: timer
})

