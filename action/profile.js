'use strict';

import superagent from 'superagent';

export const set = (user) => ({
  type: 'PROFILE_SET',
  payload: user,
});

export const failed = () => ({
  type: 'PROFILE_SET_FAILED',
});

export const create = (user) => (store) => {
  let {token} = store.getState(); 
  return superagent.post(`${__API_URL__}/profiles`)
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')
  .send(user)
  .then(res => {
    return store.dispatch(set(res.body));
  });
};

export const update = (user) => (store) => {
  let {token} = store.getState(); 
  return superagent.put(`${__API_URL__}/profiles/${user._id}`)
  .set('Authorization', `Bearer ${token}`)
  .set('Content-Type', 'application/json')
  .send(user)
  .then(res => {
    return store.dispatch(set(res.body));
  });
};

export const fetch = () => (store) => {
  let {token} = store.getState(); 
  return superagent.get(`${__API_URL__}/profile`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(set(res.body));
  })
  .catch((err) => {
    console.error(err);
    return store.dispatch(failed());
   });
};
