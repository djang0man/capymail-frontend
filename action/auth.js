'use strict';

import superagent from 'superagent';
import * as util from '../lib/util.js';

window.util = util;

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  util.cookieDelete('X-CapyMail-Token');
  return tokenRemove();
};

export const signup = user => store => {
  return superagent.post(`${__API_URL__}/auth`)
    .send(user)
    .withCredentials()
      .then(res => {
        console.log('SIGNUP ::', { res });

        const { token } = JSON.parse(res.text);
        util.cookieCreate('X-CapyMail-Token', token, 7);

        return store.dispatch(tokenSet(token));
      });
};

export const login = user => store => {
  return superagent.get(`${__API_URL__}/auth`)
    .auth(user.username, user.password)
    .withCredentials()
      .then(res => {
        console.log('SIGNIN ::', { res });

        const { token } = JSON.parse(res.text);
        util.cookieCreate('X-CapyMail-Token', token, 7);

        return store.dispatch(tokenSet(token));
      });
};

