import { rehydrateLocalStorage } from '../lib/redux-persist.js';

export const validateProfile = profile => {
  if (!profile) {
    throw new Error('Profile required');
  }

  const { firstName, lastName } = profile;

  if (!firstName || !lastName) {
    throw new Error('__VALIDATION_ERROR__ invalid profile');
  }
};

const initialState = rehydrateLocalStorage('profile', null);

export default (state=initialState, { type, payload }) => {
  switch(type) {
    case 'PROFILE_SET': 
      validateProfile(payload);
      return payload;
    case 'PROFILE_SET_FAILED': 
      return null;
    case 'TOKEN_REMOVE':
      return null;
    default: 
      return state;
  }
};

