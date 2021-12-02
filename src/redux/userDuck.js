import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retrieveFavoritesAction } from "./charsDuck";

// constant
const initalState = {
    logged: false,
    fetching: false
};

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOGOUT = "LOGOUT";


// reducer
const reducer = function (state = initalState, action) {

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                fetching: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                logged: true,
                ...action.payload
            }

        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case LOGOUT:
            return {
                ...initalState
            }

        default:
            return state;
    }

}

export default reducer;

//auxiliar
const saveStorage = function (storage) {
    localStorage.storage = JSON.stringify(storage)
}

const removeStorage = function () {
    localStorage.removeItem("storage");
}

// action
export const restoreSessionAction = function () {
    return (dispatch) => {
        let storage = localStorage.getItem("storage");
        storage = JSON.parse(storage);
        if (storage && storage.user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: storage.user
            })
        }
    }
}

export const doLoginWithGoogleAction = function () {
    return (dispatch, getState) => {
        dispatch({
            type: LOGIN
        })
        loginWithGoogle().then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.displayName,
                    photoURL: user.photoURL
                }
            });
            saveStorage(getState())
            retrieveFavoritesAction()(dispatch, getState)
        }).catch(e => {
            console.error(e);
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
    }
}

export const dologoutAction = function () {
    signOutGoogle();
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        removeStorage();
    }
}