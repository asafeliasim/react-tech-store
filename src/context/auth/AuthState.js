import React, {useReducer} from 'react';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
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

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading:true,
        user:null,
        error: null
    };

    const [state,dispatch] = useReducer(authReducer, initialState);

    //Load User
    const loadUser = async() =>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        }
        try{
            const res = await axios.get('/api/user');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }catch(err){
            //@todo - dispatch alertError
            dispatch({type:AUTH_ERROR})
        }
    };
    //Register User
    const register = async formData => {
   /*   const config = {
          headers:{
              'Content-Type' : 'application/json'
          }
      };*/
      try{
          console.log('try to post to server');
        const res = await axios.post("/api/register",formData);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data//---> return the token
        });

        loadUser();
      }catch (e) {
          console.log({e: e.message});
        dispatch({
           type:LOGIN_FAIL,
           payload:e.response.data.msg
        });
      }
    };
    //Login User
    const login = async formData => {
        try{
            console.log('try to post to server');
            console.log(formData);
            const res = await axios.post("http://localhost:3001/api/login",formData);

            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data//---> return the token
            });

            loadUser();
        }catch (e) {
            console.log({e: e.message});
            dispatch({
                type:REGISTER_FAIL,
                payload:e.response.data.msg
            });
        }
    };
    const updateProduct = async product => {
        const form = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try{
            const res = await axios.put(`http://localhost:3001/api/update/${product._id}`,product,form);
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            })
        }catch (e) {

        }

    };
    //Logout
    const logout = () =>{
        dispatch({
            type:LOGOUT
        })
    };
    //Clear Errors

    const clearErrors = () =>{
        console.log("Clear errors");
    };

    return(
        <AuthContext.Provider
            value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
                updateProduct
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};
export default AuthState;
