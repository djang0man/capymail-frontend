import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as profileActions from '../../action/profile.js';
import * as conversationActions from '../../action/conversation.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  
  componentWillMount() {
    let {loggedIn} = this.props;
    if (loggedIn) {
      this.props.fetchProfile()
      .then(action => {
        if (action.type === 'PROFILE_SET') {
          this.props.history.push('/dashboard');
        }
        if (action.type === 'PROFILE_SET_FAILED') {
          this.props.history.push('/dashboard');
        }
      });
      this.props.fetchConversations();
    }
  }

  handleLogin(user) {
    this.props.login(user)
    .then(() => {
      this.props.fetchProfile()
      .then(action => {
        if (action.type === 'PROFILE_SET') {
          this.props.history.push('/dashboard');
        }
        if (action.type === 'PROFILE_SET_FAILED') {
          this.props.history.push('/profile');
        }
      });
    })
    .catch(console.error);
  }

  handleSignup(user) {
    this.props.signup(user)
    .then(() => {
      this.props.history.push('/profile');
    })
    .catch(console.error);
  }

  render() {
    let {location} = this.props;
    
    return (
      <div className='landing'>
        {util.renderIf(location.pathname === '/',
          
        )}

        {util.renderIf(location.pathname === '/signup',
          <div>
            <h3>Signup</h3>
            <AuthForm onComplete={this.handleSignup} />
          </div>
        )}

        {util.renderIf(location.pathname === '/login',
          <div>
            <h3>Login</h3>
            <AuthForm type='login' onComplete={this.handleLogin} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(auth.login(user)),
  signup: (user) => dispatch(auth.signup(user)),
  fetchProfile: () => dispatch(profileActions.fetch()),
  fetchConversations: () => dispatch(conversationActions.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
