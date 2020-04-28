import{
    AUTH_ERROR,
    UPDATE_PRODUCT,
    SET_CURRENT,
    CLEAR_CURRENT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED
} from '../types';

export default (state,action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
              ...state,
              ...action.payload,
              isAuthenticated: true,
              loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            //@todo auth error alert
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(p=>
                    p._id === action.payload._id ? action.payload : p
                ),
                loading: false
            };
        default:
            return state;
    }
}
