import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userDuck";

let rootReducer = combineReducers({
    user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = function () {
    let store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );

    return store;
}

export default generateStore;