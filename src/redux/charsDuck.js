import axios from 'axios'

// constantes
const initialState = {
    fetching: false,
    characters: [],
    current: {}
};

const URL = "https://rickandmortyapi.com/api/character";
const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

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