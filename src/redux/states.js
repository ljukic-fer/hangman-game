import { combineReducers } from "redux";
import HighScoresReducer from "./reducers/HighScoresReducer";

const rootReducer = combineReducers({
    highScores: HighScoresReducer
})

export default rootReducer;