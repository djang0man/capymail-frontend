import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends React.Component {
  componentDidMount() {
    let {
      profile,
      loggedIn,
      location
    } = this.props;

    let { pathname } = location;

    if (!loggedIn) {
      this.props.history.push('/');
    } else {
      if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
        if (!profile) {
          this.props.history.push('/profile');
        } else {
          this.props.history.push('/dashboard');
        }
      }
    }

  }
  render() {
    return (
      <div className='auth-redirect'></div>
    ) 
  } 
}

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token
});

export default connect(mapStateToProps)(AuthRedirect);

