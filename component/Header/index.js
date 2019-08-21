import './header.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as auth from '../../action/auth.js';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }
 
  handleLogout() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    let {
      profile,
      loggedIn
    } = this.props;

    return (
      <header className='header'>
        {!loggedIn && 
          <div>
            <h1>welcome to capymail</h1>
            <p>Please login or create an account below:</p>
          </div>
        }
        {loggedIn &&
          <button className='button' onClick={ this.handleLogout }>Sign Out</button>
        }
        <nav> 
            {!loggedIn && 
              <ul> 
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>Signup</Link></li>
              </ul>
            }

            {loggedIn && !profile && 
              <p>Please create a profile to get started:</p> 
            }

            {loggedIn && profile &&
              <ul> 
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
              </ul>
            }
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

