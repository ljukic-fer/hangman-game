import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./states";


const store = configureStore ({
    reducer: rootReducer,
});

export default store;