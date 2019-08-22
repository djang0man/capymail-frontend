import React, { useState } from 'react';

import ProfileForm from '../ProfileForm';

import * as networkProfile from '../../network/profile.js';

function Profile(props) {
  const { token, profile, onSetProfile, activePage } = props;

  const [editing, setEditing] = useState(false);

  const [localProfile, setLocalProfile] = useState(profile);
  function onSetLocalProfile(localProfile) {
    setLocalProfile(localProfile);
  }

  const handleCreate = profile => {
    setEditing(false);
    onSetLocalProfile(profile);

    networkProfile.create(token, profile)
      .then(profile => {
        onSetProfile(profile);
      });
  }

  const handleUpdate = profile => {
    setEditing(false);
    onSetLocalProfile(profile);

    networkProfile.update(token, profile)
      .then(profile => {
        onSetProfile(profile);
      });
  }

  return (
    <>
      {console.log('PROFILE', props)}
      {activePage == '/profile' &&
        <div className='profile'>
          <h2>Profile</h2>
          { profile ?
            <div>
              <h3>{ localProfile.firstName } { localProfile.lastName }</h3>
              {editing ?
                <div>
                  <ProfileForm profile={ localProfile } onComplete={ handleUpdate } />
                  <button className='button' onClick={() => setEditing(false) }>
                    Cancel
                  </button>
                </div>
              :
                <div>
                  <button className='button' onClick={() => setEditing(true) }>
                    Edit Profile
                  </button>
                </div>
              }
            </div>
          :
            <ProfileForm onComplete={ handleCreate } />
          }
        </div>
      }
    </>
  )
}

export default Profile;

