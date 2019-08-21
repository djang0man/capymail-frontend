import React from 'react';

import * as networkAuth from '../../network/auth.js';
import * as networkProfile from '../../network/profile.js';

import AuthForm from '../AuthForm';

import { useAppContext } from '../App';

function Landing(props) {
  const handleLogin = user => {
    networkAuth.login(user)
      .then(token => {
        networkProfile.fetch(token)
          .then(profile => {
            // this.setState({ profile });

            // props.history.push('/dashboard');
          })
        .catch(() => {
          // props.history.push('/profile');
        })
      })
    .catch(console.error);
  }

  const handleSignup = user => {
    auth.signup(user)
      .then(() => {
        // this.setState({ loading: true });

        // props.history.push('/profile');
      })
    .catch(console.error);
  }

  let {
    token,
    loading,
    profile,
    loggedIn
  } = useAppContext();

  const { pathname } = props.location;

  if (loggedIn && profile) {
    // props.history.push('/dashboard');
  }

  if (loggedIn && !profile) {
    networkProfile.fetch(token)
      .then(() => {
        // props.history.push('/dashboard');
      })
    .catch(() => {
      // props.history.push('/profile');
    })
  }
  
  return (
    <div className='landing'>
      { console.log('LANDING RENDER') }
      {pathname === '/signup' && !loading &&
        <div>
          <h3>Signup</h3>
          <AuthForm onComplete={ handleSignup } />
        </div>
      }

      {pathname === '/login' && !loading &&
        <div>
          <h3>Login</h3>
          <AuthForm type='login' onComplete={ handleLogin } />
        </div>
      }
    </div>
  )
}

export default Landing;

