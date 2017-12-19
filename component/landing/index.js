import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as message from '../../action/message.js';
import * as clientProfile from '../../action/client-profile.js';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  
  componentWillMount() {
    let {loggedIn} = this.props;
    if (loggedIn) {
      this.props.fetchClientProfile()
      .then(action => {
        if (action.type === 'CLIENT_PROFILE_SET') {
          this.props.history.push('/messages');
        }
        if (action.type === 'CLIENT_PROFILE_FAILED') {
          this.props.history.push('/messages');
        }
      });
      this.props.fetchMessages();
    }
  }

  handleLogin(user) {
    this.props.login(user)
    .then(() => {
      this.props.fetchClientProfile()
      .then(action => {
        if (action.type === 'CLIENT_PROFILE_SET') {
          this.props.history.push('/messages');
        }
        if (action.type === 'CLIENT_PROFILE_FAILED') {
          this.props.history.push('/sender');
        }
      });
    })
    .catch(console.error);
  }

  handleSignup(user) {
    this.props.signup(user)
    .then(() => {
      this.props.history.push('/sender');
    })
    .catch(console.error);
  }

  render() {
    let {
      location,
    } = this.props;
    
    return (
      <div className='landing'>
        {util.renderIf(location.pathname === '/',
          
        )}

        {util.renderIf(location.pathname === '/create',
          <div>
            <h3>Create Conversation</h3>
            <AuthForm onComplete={this.handleSignup} />
          </div>
        )}

        {util.renderIf(location.pathname === '/enter',
          <div>
            <h3>Enter Conversation</h3>
            <AuthForm type='enter' onComplete={this.handleLogin} />
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
  fetchMessages: () => dispatch(message.fetch()),
  fetchClientProfile: () => dispatch(clientProfile.fetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
