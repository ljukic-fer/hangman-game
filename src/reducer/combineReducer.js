import { combineReducers } from "redux"
import gameReducer from "./gameReducer"
import usernameReducer from "./usernameReducer"
import highScoresReducer from "./highScoresReducer"

const rootReducer = combineReducers({
    game: gameReducer,
    username: usernameReducer,
    highScores: highScoresReducer
})

export default rootReducer