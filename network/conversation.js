'use strict';

import superagent from 'superagent';
import realtime from '../lib/realtime.js';

export const createRequest = (token, conversation) => {
  let body;

  console.log('CONVERSATION :: ', conversation);

  return superagent.post(`${__API_URL__}/conversations`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(conversation)
      .then(res => {
        body = res.body;
        return body;
      })
        .then(() => {
          realtime.emit('CONVERSATION_CREATE', {
            title: conversation.title,
            conversationId: body._id,
          });
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

