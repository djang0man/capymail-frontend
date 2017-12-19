import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import * as auth from '../../action/auth.js';
import * as util from '../../lib/util.js';

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
    let {loggedIn, clientProfile} = this.props;
    return (
      <header className='header'>
        {util.renderIf(!loggedIn, 
          <div>
            <h1>welcome to capymail</h1>
            <p>please enter a new or existing conversation below</p>
          </div>
        )}
        {util.renderIf(loggedIn, 
          <button className='button' onClick={this.handleLogout}>Exit Conversation</button>
        )}
        <nav> 
            {util.renderIf(!loggedIn, 
              <ul> 
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/create'>Create New</Link></li>
                <li><Link to='/enter'>Enter Existing</Link></li>
              </ul>
            )}
            {util.renderIf(loggedIn && !clientProfile, 
              <p>Please enter the sender name to get started:</p> 
            )}
            {util.renderIf(loggedIn && clientProfile, 
              <ul> 
                <li><Link to='/sender'>Sender Details</Link></li>
                <li><Link to='/messages'>Message Stream</Link></li>
              </ul>
            )}
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  clientProfile: state.clientProfile,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
