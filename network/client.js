import { rehydrateCookie, rehydrateLocalStorage } from '../lib/rehydrate.js';

export const tokenState = rehydrateCookie('X-CapyMail-Token', null);
export const profileState = rehydrateLocalStorage('profile', null);

