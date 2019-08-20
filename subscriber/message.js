import realtime from '../lib//realtime.js';
import * as messageActions from '../action/message.js';

export default store => {
  realtime.on('MESSAGE_CREATE', msg => store.dispatch(messageActions.create(msg)));
};

