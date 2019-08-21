import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../AuthForm';

import * as auth from '../../action/auth.js';
import * as profileActions from '../../action/profile.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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

  componentDidMount() {
    let {
      profile,
      loggedIn
    } = this.props;

    if (loggedIn && profile) {
      return this.props.history.push('/dashboard');
    }

    if (loggedIn && !profile) {
      this.props.fetchProfile()
        .then(action => {
          if (action.type === 'PROFILE_SET') {
            return this.props.history.push('/dashboard');
          }
          if (action.type === 'PROFILE_SET_FAILED') {
            return this.props.history.push('/profile');
          }
        });
    }
  }

  render() {
    const { pathname } = this.props.location;
    
    return (
      <div className='landing'>
        { console.log('LANDING RENDER') }
        {pathname === '/signup' &&
          <div>
            <h3>Signup</h3>
            <AuthForm onComplete={ this.handleSignup } />
          </div>
        }

        {pathname === '/login' &&
          <div>
            <h3>Login</h3>
            <AuthForm type='login' onComplete={ this.handleLogin } />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  loggedIn: !!state.token
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(auth.login(user)),
  signup: (user) => dispatch(auth.signup(user)),
  fetchProfile: () => dispatch(profileActions.fetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

