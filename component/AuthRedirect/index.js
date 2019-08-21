import React from 'react';

import { useAppContext } from '../App';

function AuthRedirect(props) {
  let {
    profile,
    loggedIn,
  } = useAppContext();

  let { pathname } = props.location;

  if (!loggedIn) {
    if (pathname !== '/login' && pathname !== '/signup') {
      // props.history.push('/');
    }
  }

  if (loggedIn && !profile) {
    // props.history.push('/profile');
  }

  if (!pathname.includes('/conversations')) {
    switch (pathname) {
      case '/':
      case '/login':
      case '/signup':
      case '/profile':
      case '/dashboard':
        break;
      default:
        // props.history.push('/');
    }
  }

  return (
    <>
      { console.log('AUTHREDIRECT RENDER') }
    </>
  )
}

export default AuthRedirect;

