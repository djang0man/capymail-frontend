import { rehydrateCookie } from '../lib/redux-persist.js';

const intialState = rehydrateCookie('X-CapyMail-Token', null);

export default (state=intialState, { type, payload }) => {
  switch(type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};

