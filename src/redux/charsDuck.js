import axios from 'axios'
import { getFavoritesDB, updateDB } from '../firebase';

// constantes
const initialState = {
    fetching: false,
    characters: [],
    current: {},
    favorites: []
};

const URL = "https://rickandmortyapi.com/api/character";
const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

const REMOVE_CHARACTER = "REMOVE_CHARACTER";

const ADD_FAV_CHARACTER = "ADD_FAV_CHARACTER";

const REMOVE_FAV_CHARACTER = "REMOVE_FAV_CHARACTER";

const GET_FAVS = "GET_FAVS";
const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
const GET_FAVS_ERROR = "GET_FAVS_ERROR";

// reducer
const reducer = function (state = initialState, action) {

    switch (action.type) {

        case GET_CHARACTERS:
            return {
                ...state,
                fetching: true
            }

        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                characters: action.payload,
                fetching: false
            }

        case GET_CHARACTERS_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case REMOVE_CHARACTER:
            return {
                ...state,
                characters: action.payload
            }

        case ADD_FAV_CHARACTER:
            return {
                ...state,
                ...action.payload
            }

        case REMOVE_FAV_CHARACTER:
            return {
                ...state,
                ...action.payload
            }

            case GET_FAVS:
                return {
                    ...state,
                    fetching: true
                }

                case GET_FAVS_ERROR:
                return {
                    ...state,
                    fetching: false,
                    error: action.payload
                }

                case GET_FAVS_SUCCESS:
                return {
                    ...state,
                    fetching: false,
                    favorites: action.payload
                }

        default:
            return state;
    }

}

export default reducer;

// actions (thunks)
export const getCharactersAction = function () {
    return async (dispatch, _getState) => {
        dispatch({
            type: GET_CHARACTERS
        });
        try {
            const result = await axios.get(URL);
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: result.data.results
            });
        } catch (error) {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: error.message
            });
        }
    }
}

export const removeCharacterAction = function () {

    return (dispatch, getState) => {
        const { characters } = getState().character;
        characters.shift();
        dispatch({
            type: REMOVE_CHARACTER,
            payload: [...characters]
        })
    }

}

export const addToFavoritesAction = () => (dispatch, getState) => {
    const { characters, favorites } = getState().character;
    const { uid } = getState().user;
    const character = characters.shift();
    updateDB([...favorites, character], uid);
    dispatch({
        type: ADD_FAV_CHARACTER,
        payload: { characters: [...characters], favorites: [...favorites, character] }
    })
}

export const removeFavoriteAction = (id) => (dispatch, getState) => {
    console.log(id)
    const { characters, favorites } = getState().character;
    const character = favorites.shift();
    dispatch({
        type: REMOVE_FAV_CHARACTER,
        payload: { characters: [...characters, character], favorites: [...favorites] }
    })
}

export const retrieveFavoritesAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVS
    });
    const { uid } = getState().user;
    return getFavoritesDB(uid).then(favorites => {
        dispatch({
            type: GET_FAVS_SUCCESS,
            payload: [...favorites]
        })
    }).catch(e => {
        console.error(e);
        dispatch({
            type: GET_FAVS_ERROR,
            payload: e.message
        });
    })
}