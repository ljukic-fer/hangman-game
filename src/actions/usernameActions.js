export const setName = (name) => {
    return {
        type: 'SET_NAME',
        payload: name
    }
}

export const addGuessedLetter = (letter) => {
    return {
        type: 'ADD_GUESSED_LETTER',
        payload: letter
    }
}