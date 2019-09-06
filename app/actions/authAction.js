import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED } from '@modules/constants'
import axios from 'axios';
import { auth_api } from '../services/apiUrl';

const authApi = () => (
    dispatch => {
        dispatch(userLogIn())
        axios.post(auth_api + "userLogin", {tel: 778422810,mdp: 12345
        })
        .then( json => {
            dispatch(userLogInSuccess(json.message))
        })
        .catch( error => {
            dispatch(userLogInFailed(error.message))
        })
        
    }
)

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

export default authApi;