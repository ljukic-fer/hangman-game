
const initialState = {
    name: '',
    chars: '______',
    charCounter: 0
}

const HomePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            };
        case 'SET_CHARS':
            return {
                ...state,
                chars: action.payload
            }
        case 'SET_CHAR_COUNTER':
            return {
                ...state,
                charCounter: action.payload
            }
        default:
            return state;
    }
}

export default HomePageReducer;