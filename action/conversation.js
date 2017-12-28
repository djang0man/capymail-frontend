'use strict';

import superagent from 'superagent';
import realtime from '../lib/realtime.js';

export const set = (user) => ({
  type: 'CONVERSATIONS_SET',
  payload: user,
});

export const setOne = (user) => ({
  type: 'CONVERSATION_SET',
  payload: user,
});

export const unset = () => ({
  type: 'CONVERSATION_UNSET',
});

export const create = (conversation) => ({
  type: 'CONVERSATION_CREATE',
  payload: conversation,
});

export const failed = () => ({
  type: 'CONVERSATION_CREATE_FAILED',
});

export const createRequest = (conversation) => (store) => {
  let body;
  let {token} = store.getState(); 
  console.log('CONVERSATION :: ', conversation);
  return superagent.post(`${__API_URL__}/conversations`)
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')
  .send(conversation)
  .then(res => {
    body = res.body;
    return store.dispatch(create(body));
  })
  .then(() => {
    realtime.emit('CONVERSATION_CREATE', {
      title: conversation.title,
      conversationId: body._id,
    });
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
  });
};

export const fetch = () => (store) => {
  let {token, profile} = store.getState();
  return superagent.get(`${__API_URL__}/conversations`)
  .set('Authorization', `Bearer ${token}`)
  .query(profile)
  .then(res => {
    return store.dispatch(set(res.body));
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};

export const fetchById = (id) => (store) => {
  let {token} = store.getState();
  return superagent.get(`${__API_URL__}/conversations/${id}`)
  .set('Authorization', `Bearer ${token}`)
  .send(id)
  .then(res => {
    return store.dispatch(setOne(res.body));
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};
