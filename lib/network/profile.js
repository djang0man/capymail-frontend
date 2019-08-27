'use strict';

import superagent from 'superagent';
import * as util from '../util.js';

window.util = util;

export const create = (token, user) => {
  return superagent.post(`${__API_URL__}/profiles`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(user)
      .then(res => {
        util.setLocalStorage('profile', JSON.stringify(res.body));
        return res.body;
      });
};

export const update = (token, user) => {
  return superagent.put(`${__API_URL__}/profiles/${user._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(user)
      .then(res => {
        util.setLocalStorage('profile', JSON.stringify(res.body));
        return res.body;
      });
};

export const fetch = token => {
  return superagent.get(`${__API_URL__}/profile`)
    .set('Authorization', `Bearer ${token}`)
      .then(res => {
        util.setLocalStorage('profile', JSON.stringify(res.body));
        return res.body;
      });
};

