'use strict';

import superagent from 'superagent';
import realtime from '../lib/realtime.js';

export const set = (user) => ({
  type: 'MESSAGES_SET',
  payload: user,
});

export const create = (message) => ({
  type: 'MESSAGE_CREATE',
  payload: message,
});

export const failed = () => ({
  type: 'MESSAGE_CREATE_FAILED',
});

export const createRequest = (message) => (store) => {
  let body;
  let {token, clientProfile} = store.getState(); 
  return superagent.post(`${__API_URL__}/messages`)
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')
  .send(message)
  .then(res => {
    body = res.body;
    return store.dispatch(create(body));
  })
  .then(() => {
    realtime.emit('MESSAGE_CREATE', {
      subject: message.subject,
      content: message.content,
      recipientEmail: message.recipientEmail,
      senderEmail: message.senderEmail,
      senderFirstName: message.senderFirstName,
      senderLastName: message.senderLastName,
      messageId: body._id,
    });
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
  });
};

export const fetch = () => (store) => {
  let {token, clientProfile} = store.getState();
  return superagent.get(`${__API_URL__}/messages`)
  .set('Authorization', `Bearer ${token}`)
  .query(clientProfile)
  .then(res => {
    return store.dispatch(set(res.body));
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};
