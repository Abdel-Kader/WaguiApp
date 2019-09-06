import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import  userLogIn from '@store/Reducers/authReducer'


export default createStore (userLogIn);