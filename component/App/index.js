import './foundation.min.css';
import './app.scss';

import React, { createContext, useContext, useState } from 'react';

import Header from '../Header';
import Landing from '../Landing';
import Profile from '../Profile';
import Dashboard from '../Dashboard';

import * as rehydrate from '../../lib/rehydrate.js';
import * as networkAuth from '../../lib/network/auth.js';

const cachedToken = rehydrate.tokenState || null;
const cachedProfile = rehydrate.profileState || null;
const cachedLoggedIn = !!cachedToken;

const defaultActivePage = cachedLoggedIn ? '/dashboard' : '/';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function App() {
  const [activePage, setActivePage] = useState(defaultActivePage);
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
    if (!loggedIn) {
      setProfile(null);
      setActivePage('/');
      networkAuth.logout();
    }

    setLoggedIn(loggedIn);
  }

  const [conversations, setConversations] = useState([]);
  function onSetConversations(conversations) {
    setConversations(conversations);
  }

  return (
    <div className='app row'>
      { console.log('APP RENDER') }
      <div className='columns'>
        <AppContext.Provider
          value={{
            token,
            profile,
            loggedIn,
            activePage,
            conversations,
            onSetToken,
            onSetProfile,
            onSetLoggedIn,
            onSetActivePage,
            onSetConversations
          }}>
          <Header />
          <Landing />
          { activePage == '/profile' &&
            <Profile />
          }
          { activePage == '/dashboard' &&
            <Dashboard />
          }
        </AppContext.Provider>
      </div>
    </div>
  )
}

export default App;

