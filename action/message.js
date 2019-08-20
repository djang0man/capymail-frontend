'use strict';

import superagent from 'superagent';
import realtime from '../lib/realtime.js';

export const set = conversation => ({
  type: 'MESSAGES_SET',
  payload: conversation,
});

export const unset = () => ({
  type: 'MESSAGES_UNSET',
});

export const create = message => ({
  type: 'MESSAGE_CREATE',
  payload: message,
});

export const failed = () => ({
  type: 'MESSAGE_CREATE_FAILED',
});

export const createRequest = message => store => {
  let body;

  const { token, conversation } = store.getState(); 

  const request = {
    message,
    conversation,
  };

  return superagent.post(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(request)
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

export const fetch = () => store => {
  const { token, conversation } = store.getState();

  return superagent.get(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .query(conversation)
      .then(res => {
        return store.dispatch(set(res.body));
      })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};

export const fetchById = id => store => {
  const { token } = store.getState();

  return superagent.get(`${__API_URL__}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .query({ _id: id })
      .then(res => {
        return store.dispatch(set(res.body));
      })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};

