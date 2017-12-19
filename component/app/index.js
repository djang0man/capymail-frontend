import './foundation.min.css';
import './app.scss';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from '../header';
import Landing from '../landing';
import Profile from '../profile';
import Dashboard from '../dashboard';
import AuthRedirect from '../auth-redirect';
import * as message from '../../action/message.js';
import * as clientProfile from '../../action/client-profile.js';

class App extends React.Component {
  render() {
    return (
      <div className='app row'>
        <BrowserRouter>
          <div className='columns'>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/enter' component={Landing} />
            <Route exact path='/create' component={Landing} />
            <Route exact path='/sender' component={Profile} />
            <Route exact path='/messages' component={Dashboard} />
            <Route path='*' component={AuthRedirect} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  clientProfile: state.clientProfile,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(message.fetch()),
  fetchClientProfile: () => dispatch(clientProfile.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
