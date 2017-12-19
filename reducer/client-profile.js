import {rehydrateLocalStorage} from '../lib/redux-persist.js';

export const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('Profile required');
  }
  let {firstName, lastName} = profile;
  if (!firstName || !lastName) {
    throw new Error('__VALIDATION_ERROR__ invalid profile');
  }
};

let initialState = rehydrateLocalStorage('clientProfile', null);

export default (state=initialState, {type, payload}) => {
  switch(type) {
    case 'CLIENT_PROFILE_SET': 
      validateProfile(payload);
      return payload;
    case 'CLIENT_PROFILE_FAILED': 
      return null;
    case 'TOKEN_REMOVE':
      return null;
    default: 
      return state;
  }
};
