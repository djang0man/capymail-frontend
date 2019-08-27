'use strict';

import superagent from 'superagent';

export const create = (token, conversation, message) => {
  let body;

  let request = {
    message,
    conversation
  };

  return superagent.post(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(request)
      .then(res => {
        body = res.body;
        return body;
      })
  .catch((err) => {
    console.error(err);
  });
};

export const fetch = (token, conversation) => {
  return superagent.get(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .query(conversation)
      .then(res => {
        return res.body;
      })
  .catch((err) => {
    console.error(err);
   });
};

export const fetchById = (token, id) => {
  return superagent.get(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .query({ _id: id })
      .then(res => {
        return res.body;
      })
  .catch((err) => {
    console.error(err);
   });
};

