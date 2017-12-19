import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as util from '../../lib/util.js';

class AuthRedirect extends React.Component {
  componentWillMount() {
    let {loggedIn, clientProfile, location} = this.props;
    let {pathname} = location;
    if (!loggedIn) {
      this.props.history.push('/');
    } else {
      if (pathname === '/' || pathname === '/enter' || pathname === '/create') {
        if (!clientProfile) {
          this.props.history.push('/sender');
        } else {
          this.props.history.push('/messages');
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
  loggedIn: !!state.token,
  clientProfile: state.clientProfile,
});

export default connect(mapStateToProps)(AuthRedirect);
