import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import charactersReducer, { getCharactersAction } from "./charsDuck";
import userReducer, { restoreSessionAction } from "./userDuck";

let rootReducer = combineReducers({
    user: userReducer,
    character: charactersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = function () {
    let store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    // consiguiendo los personajes por primera vez
    getCharactersAction()(store.dispatch, store.getState);
    restoreSessionAction()(store.dispatch);
    return store;
}

export default generateStore;