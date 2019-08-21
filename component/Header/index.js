import './header.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import * as networkAuth from '../../network/auth.js';

import { useAppContext } from '../App';

function Header(props) {
  const handleLogout = () => {
    networkAuth.logout();
    // props.history.push('/');
  }

  let {
    profile,
    loggedIn
  } = useAppContext();

  return (
    <header className='header'>
      {!loggedIn && 
        <div>
          <h1>welcome to capymail</h1>
          <p>Please login or create an account below:</p>
        </div>
      }

      {loggedIn &&
        <button className='button' onClick={ handleLogout }>Sign Out</button>
      }

      <nav> 
          {!loggedIn && 
            <ul> 
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
          }

          {loggedIn && !profile && 
            <p>Please create a profile to get started:</p> 
          }

          {loggedIn && profile &&
            <ul> 
              <li><Link to='/profile'>Profile</Link></li>
              <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
          }
      </nav>
    </header>
  )
}

export default Header;

