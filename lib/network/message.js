'use strict';

import superagent from 'superagent';
import realtime from '../realtime';

export const create = (token, conversation, message) => {
  let body;

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
        return body;
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

