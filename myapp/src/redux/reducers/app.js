const initialState = {
    debug: true,
    loaded: true,
    session: false,
    auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    }
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "APP_STATE":
            return { ...state, ...action.state };
        case "LOGIN_REQUEST":
            return { ...state, auth: { ...state.auth, loading: true, error: null } };
        case "LOGIN_SUCCESS":
            return { 
                ...state, 
                auth: { 
                    isAuthenticated: true, 
                    user: action.payload.user, 
                    loading: false, 
                    error: null 
                } 
            };
        case "LOGIN_FAILURE":
            return { 
                ...state, 
                auth: { 
                    isAuthenticated: false, 
                    user: null, 
                    loading: false, 
                    error: action.payload.error 
                } 
            };
        case "LOGOUT":
            return { 
                ...state, 
                auth: { 
                    isAuthenticated: false, 
                    user: null, 
                    loading: false, 
                    error: null 
                } 
            };
        case "REGISTER_REQUEST":
            return { ...state, auth: { ...state.auth, loading: true, error: null } };
        case "REGISTER_SUCCESS":
            return { 
                ...state, 
                auth: { 
                isAuthenticated: true, 
                user: action.payload.user, 
                loading: false, 
                error: null 
                } 
            };
        case "REGISTER_FAILURE":
            return { 
                ...state, 
                auth: { 
                isAuthenticated: false, 
                user: null, 
                loading: false, 
                error: action.payload.error 
                } 
            };
        default:
            return state;
    }
}