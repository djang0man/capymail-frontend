import realtime from '../lib//realtime.js';
import * as conversationActions from '../action/conversation.js';

export default (store) => {
  realtime.on('CONVERSATION_CREATE', (conversation) => store.dispatch(conversationActions.create(conversation)));
};
