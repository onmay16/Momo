const initialState = {
    signedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'user/login': {
            return {
                ...state,
                signedIn: true,
            };
        }
        case 'user/logout': {
            return {
                ...state,
                signedIn: false,
            };
        }
        default:
            return state;
    }
}
