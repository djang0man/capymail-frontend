'use strict';

import superagent from 'superagent';

export const create = (token, conversation) => {
  let body;

  return superagent.post(`${__API_URL__}/conversations`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(conversation)
      .then(res => {
        body = res.body;
        return body;
      })
    .catch((err) => {
      console.error(err);
    });
};

export const fetch = (token, profile) => {
  return superagent.get(`${__API_URL__}/conversations`)
    .set('Authorization', `Bearer ${token}`)
    .query(profile)
      .then(res => {
        return res.body;
      })
  .catch((err) => {
    console.error(err);
   });
};

export const fetchById = (token, id) => {
  return superagent.get(`${__API_URL__}/conversations/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(id)
      .then(res => {
        return res.body;
      })
  .catch((err) => {
    console.error(err);
   });
};

