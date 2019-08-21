'use strict';

import superagent from 'superagent';
import * as util from '../lib/util.js';

window.util = util;

export const logout = () => {
  util.cookieDelete('X-CapyMail-Token');
};

export const login = user => {
  return superagent.get(`${__API_URL__}/auth`)
    .auth(user.username, user.password)
    .withCredentials()
      .then(res => {
        console.log('SIGNIN ::', { res });

        const { token } = JSON.parse(res.text);
        util.cookieCreate('X-CapyMail-Token', token, 7);

        return token;
      });
};

export const signup = user => {
  return superagent.post(`${__API_URL__}/auth`)
    .send(user)
    .withCredentials()
      .then(res => {
        console.log('SIGNUP ::', { res });

        const { token } = JSON.parse(res.text);
        util.cookieCreate('X-CapyMail-Token', token, 7);

        return token;
      });
};

