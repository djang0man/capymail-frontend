import './header.scss';

import React from 'react';

import * as networkAuth from '../../network/auth.js';

import Button from '../Button';

function Header(props) {
  const {
    profile,
    loggedIn,
    onSetProfile,
    onSetLoggedIn,
    onSetActivePage
  } = props;

  const handleLogout = () => {
    networkAuth.logout();
    onSetProfile(null);
    onSetLoggedIn(!loggedIn);
    onSetActivePage('/');
  }

  return (
    <header className='header'>
      {!loggedIn && 
        <div>
          <h1>welcome to capymail</h1>
          <p>Please login or create an account below:</p>
        </div>
      }

      {loggedIn &&
        <Button className='button' onClick={ handleLogout }>Sign Out</Button>
      }

      <nav> 
          {!loggedIn && 
            <ul> 
              <li><Button onClick={ () => onSetActivePage('/') }>Home</Button></li>
              <li><Button onClick={ () => onSetActivePage('/login') }>Login</Button></li>
              <li><Button onClick={ () => onSetActivePage('/signup') }>Signup</Button></li>
            </ul>
          }

          {loggedIn && !profile && 
            <p>Please create a profile to get started:</p> 
          }

          {loggedIn && profile &&
            <ul> 
              <li><Button onClick={ () => onSetActivePage('/profile') }>Profile</Button></li>
              <li><Button onClick={ () => onSetActivePage('/dashboard') }>Dashboard</Button></li>
            </ul>
          }
      </nav>
    </header>
  )
}

export default Header;

