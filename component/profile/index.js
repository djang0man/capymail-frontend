import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '..//profile-form';
import * as util from '../../lib/util.js';
import * as clientProfile from '../../action/client-profile.js';

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
      this.props.history.push('/messages');
    });
  }

  handleUpdate(profile){
    this.props.profileUpdate(profile);
    this.setState({editing: false});
  }

  render(){
    let {
      profile, 
      profileCreate,
    } = this.props;

    return (
      <div className='profile'> 
        <h2>Sender</h2>
        { profile ? 
          <div>
            <h3>{profile.firstName} {profile.lastName}</h3>
            { this.state.editing ? 
              <div>
                <ProfileForm profile={profile} onComplete={this.handleUpdate} />
                <button className='button' onClick={() => this.setState({editing: false})}>
                  Cancel 
                </button>
              </div>
            : 
              <div>
                <button className='button' onClick={() => this.setState({editing: true})}>
                  Edit Sender
                </button>
              </div>
            }
          </div>
        : 
          <ProfileForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.clientProfile,
});

const mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(clientProfile.create(profile)),
  profileUpdate: (profile) => dispatch(clientProfile.update(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
