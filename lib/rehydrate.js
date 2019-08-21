import { cookieFetch } from './util.js';

export const rehydrateLocalStorage = (key, intialState) => {
  try {
    return JSON.parse(window.localStorage[key]);
  } catch(err) {
    return intialState;
  }
};

export const rehydrateCookie = (key, intialState) => {
  return cookieFetch(key) || intialState;
};

