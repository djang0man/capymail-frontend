'use strict';

import superagent from 'superagent';
import {cookieDelete} from '../lib/util.js';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  cookieDelete('X-CapyMail-Token');
  return tokenRemove();
};

export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/auth`)
  .send(user)
  .withCredentials()
  .then(res => {
    let {token} = JSON.parse(res.text);
    return store.dispatch(tokenSet(token));
  });
};

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/auth`)
  .auth(user.username, user.password)
  .withCredentials()
  .then(res => {
    let {token} = JSON.parse(res.text);
    return store.dispatch(tokenSet(token));
  });
};
