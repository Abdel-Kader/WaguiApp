import { USER_LOGIN, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from "./actionTypes";
import axios from 'axios';
import { auth_api } from '../services/apiUrl';

export const logInClick = (tel, pass) => {
    axios.post(auth_api + "userLogin", {tel: 778422810,mdp: 12345
    })
    .then( json => {
        dispatch(userLogInSuccess(json.message))
    })
    .catch( error => {
        dispatch(userLogInFailed(error.message))
    })
}


const userLogIn = () => ({
    type: USER_LOGIN
})

const userLogInSuccess = (data) => ({
    type: USER_LOGIN_SUCCESS,
    data: data
})

const userLogInFailed = (error) => ({
    type: USER_LOGIN_FAILED,
    error: error
});


