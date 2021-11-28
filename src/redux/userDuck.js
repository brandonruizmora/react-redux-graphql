// constant
const initalState = {
    logged: false
};

const login = "[auth] login";

// reducer

const reducer = function (state = initalState, action) {

    switch (action.type) {
        case login:
            return {
                logged: true
            }

        default:
            return state;
    }

}

export default reducer;

// action