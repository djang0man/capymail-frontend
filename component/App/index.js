import './foundation.min.css';
import './app.scss';

import React, { createContext, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as client from '../../network/client.js';

import Header from '../Header';
import Landing from '../Landing';
import Profile from '../Profile';
import AuthRedirect from '../AuthRedirect';

const token = client.tokenState;
const loggedIn = !!token;
const profile = client.profileState || null;

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

class App extends React.Component {
  render() {
    return (
      <div className='app row'>
        { console.log('APP RENDER') }
        <BrowserRouter>
          <div className='columns'>
            <AppContext.Provider
              value={{
                token,
                profile,
                loggedIn,
                messages: null,
                conversation: null,
                conversations: null
              }}>
              <Header />
              <Route exact path='/' component={ Landing } />
              <Route exact path='/login' component={ Landing } />
              <Route exact path='/signup' component={ Landing } />
              <Route exact path='/profile' component={ Profile } />
              <Route path='*' component={ AuthRedirect } />
            </AppContext.Provider>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

