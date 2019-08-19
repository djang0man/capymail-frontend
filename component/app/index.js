import './foundation.min.css';
import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header';
import Landing from '../Landing';
import Profile from '../Profile';
import Dashboard from '../Dashboard';
import Conversation from '../Conversation';
import AuthRedirect from '../AuthRedirect';
import * as profileActions from '../../action/profile.js';
import * as messageActions from '../../action/message.js';
import * as conversationActions from '../../action/conversation.js';

class App extends React.Component {
  render() {
    return (
      <div className='app row'>
        <BrowserRouter>
          <div className='columns'>
            <Header />
            <Route exact path='/' component={ Landing } />
            <Route exact path='/login' component={ Landing } />
            <Route exact path='/signup' component={ Landing } />
            <Route exact path='/profile' component={ Profile } />
            <Route exact path='/dashboard' component={ Dashboard } />
            <Route path='/conversations/:id' component={ Conversation } />
            <Route path='*' component={ AuthRedirect } />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  loggedIn: !!state.token
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: () => dispatch(profileActions.fetch()),
  fetchMessages: () => dispatch(messageActions.fetch()),
  fetchConversations: () => dispatch(conversationActions.fetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

