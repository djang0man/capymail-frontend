import './foundation.min.css';
import './app.scss';

import React, { Component, useState } from 'react';

import * as client from '../../network/client.js';

import Header from '../Header';
import Landing from '../Landing';
import Profile from '../Profile';

const cachedToken = client.tokenState || null;
const cachedProfile = client.profileState || null;
const cachedLoggedIn = !!cachedToken;

function App() {
  const [activePage, setActivePage] = useState('/');
  function onSetActivePage(activePage) {
    setActivePage(activePage);
  }

  const [token, setToken] = useState(cachedToken);
  function onSetToken(token) {
    setToken(token);
  }

  const [profile, setProfile] = useState(cachedProfile);
  function onSetProfile(profile) {
    setProfile(profile);
  }

  const [loggedIn, setLoggedIn] = useState(cachedLoggedIn);
  function onSetLoggedIn(loggedIn) {
    setLoggedIn(loggedIn);
  }

  return (
    <div className='app row'>
      <div className='columns'>
        <Header
          profile={ profile }
          loggedIn={ loggedIn }
          onSetProfile={ onSetProfile }
          onSetLoggedIn={ onSetLoggedIn }
          onSetActivePage={ onSetActivePage }
        />
        <Landing
          token={ token }
          onSetToken={ onSetToken }
          loggedIn={ loggedIn }
          onSetLoggedIn={ onSetLoggedIn }
          profile={ profile }
          onSetProfile={ onSetProfile }
          activePage={ activePage }
          onSetActivePage={ onSetActivePage }
        />
        <Profile
          token={ token }
          profile={ profile }
          onSetProfile={ onSetProfile }
          activePage={ activePage }
        />
      </div>
    </div>
  )
}

export default App;

