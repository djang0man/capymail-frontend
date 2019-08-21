import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AuthRedirect extends React.Component {
  componentDidMount() {
    let {
      profile,
      location,
      loggedIn,
    } = this.props;

    let { pathname } = location;

    if (!loggedIn) {
      if (pathname !== '/login' && pathname !== '/signup') {
        return this.props.history.push('/');
      }
    }

    if (loggedIn && !profile) {
      return this.props.history.push('/profile');
    }

    if (!pathname.includes('/conversations')) {
      switch (pathname) {
        case '/':
        case '/login':
        case '/signup':
        case '/profile':
        case '/dashboard':
          break;
        default:
          return this.props.history.push('/');
      }
    }
  }

  render() {
    return (
      <>
        { console.log('AUTHREDIRECT RENDER') }
      </>
    ) 
  } 
}

const mapStateToProps = state => ({
  profile: state.profile,
  loggedIn: !!state.token
});

export default connect(mapStateToProps)(AuthRedirect);

