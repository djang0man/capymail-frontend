import React from 'react';

import * as networkAuth from '../../network/auth.js';
import * as networkProfile from '../../network/profile.js';

import AuthForm from '../AuthForm';

function Landing(props) {
  const {
    token,
    onSetToken,
    loggedIn,
    onSetLoggedIn,
    profile,
    onSetProfile,
    activePage,
    onSetActivePage
  } = props;

  const handleLogin = user => {
    networkAuth.login(user)
      .then(token => {
        onSetToken(token);
        onSetLoggedIn(!!token);
        networkProfile.fetch(token)
          .then(profile => {
            onSetProfile(profile);
            onSetActivePage('/dashboard');
          })
        .catch(e => {
          console.error(e);
          onSetActivePage('/profile');
        })
      })
    .catch(console.error);
  }

  const handleSignup = user => {
    networkAuth.signup(user)
      .then(token => {
        onSetToken(token);
        onSetLoggedIn(!!token);
        onSetActivePage('/profile');
      })
    .catch(e => {
      console.error(e);
      onSetActivePage('/signup');
    });
  }

  if (loggedIn && profile) {
    () => onSetActivePage('/dashboard');
  }

  if (loggedIn && !profile) {
    networkProfile.fetch(token)
      .then(profile => {
        onSetProfile(profile);
        onSetActivePage('/dashboard');
      })
    .catch(() => {
      console.error;
      onSetActivePage('/profile');
    })
  }
  
  return (
    <div className='landing'>
      { console.log('LANDING RENDER') }
      {activePage == '/signup' &&
        <div>
          <h3>Signup</h3>
          <AuthForm onComplete={ handleSignup } />
        </div>
      }

      {activePage == '/login' &&
        <div>
          <h3>Login</h3>
          <AuthForm type='login' onComplete={ handleLogin } />
        </div>
      }
    </div>
  )
}

export default Landing;

