import {combineReducers} from 'redux';
import token from './token.js';
import profile from './profile.js';
import conversations from './conversations.js';
import conversation from './conversation.js';
import messages from './messages.js';

export default combineReducers({token, profile, conversations, conversation, messages});
