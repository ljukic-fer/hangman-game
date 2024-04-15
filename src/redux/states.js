import { combineReducers } from "redux";
import HighScoresReducer from "./reducers/HighScoresReducer";
import HomePageReducer from "./reducers/HomePageReducer";
import GameReducer from "./reducers/GameReducer";

const rootReducer = combineReducers({
    highScores: HighScoresReducer,
    homePage: HomePageReducer,
    game: GameReducer
})

export default rootReducer;