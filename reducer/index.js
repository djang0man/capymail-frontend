import {combineReducers} from 'redux';
import token from './token.js';
import clientProfile from './client-profile.js';
import messages from './messages.js';

export default combineReducers({token, clientProfile, messages});
