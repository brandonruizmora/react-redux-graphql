import { loginWithGoogle } from "../firebase";

// constant
const initalState = {
    logged: false,
    fetching: false
};

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

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

        default:
            return state;
    }

}

export default reducer;

//auxiliar

const saveStorage = function (storage) {
    localStorage.storage = JSON.stringify(storage)
}

// action
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
        }).catch(e => {
            console.error(e);
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
    }
}