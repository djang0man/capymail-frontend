import React from 'react';
import { connect } from 'react-redux';

import ProfileForm from '../ProfileForm';

import * as profileActions from '../../action/profile.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }

  handleUpdate(profile){
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render(){
    let {
      profile, 
      profileCreate,
    } = this.props;

    let {
      editing
    } = this.state;

    return (
      <div className='profile'> 
        { console.log('PROFILE RENDER') }
        <h2>Profile</h2>
        { profile ? 
          <div>
            <h3>{ profile.firstName } { profile.lastName }</h3>
            {editing ? 
              <div>
                <ProfileForm profile={ profile } onComplete={ this.handleUpdate } />
                <button className='button' onClick={() => this.setState({ editing: false })}>
                  Cancel 
                </button>
              </div>
            : 
              <div>
                <button className='button' onClick={() => this.setState({ editing: true })}>
                  Edit Profile
                </button>
              </div>
            }
          </div>
        : 
          <ProfileForm onComplete={ this.handleCreate } />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileActions.create(profile)),
  profileUpdate: (profile) => dispatch(profileActions.update(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

