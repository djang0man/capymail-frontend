import { cookieFetch } from './util.js';

const rehydrateLocalStorage = (key, intialState) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch(err) {
    return intialState;
  }
};

const rehydrateCookie = (key, intialState) => {
  return cookieFetch(key) || intialState;
};

export const tokenState = rehydrateCookie('X-CapyMail-Token', null);
export const profileState = rehydrateLocalStorage('profile', null);

