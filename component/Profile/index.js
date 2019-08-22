import React, { useState } from 'react';

import Button from '../Button';
import ProfileForm from '../ProfileForm';

import * as networkProfile from '../../network/profile.js';

function Profile(props) {
  const {
    token,
    profile,
    onSetProfile,
    activePage
  } = props;

  const [editing, setEditing] = useState(false);

  const handleCreate = profile => {
    setEditing(false);

    networkProfile.create(token, profile)
      .then(profile => {
        onSetProfile(profile);
      });
  }

  const handleUpdate = profile => {
    setEditing(false);

    networkProfile.update(token, profile)
      .then(profile => {
        onSetProfile(profile);
      });
  }

  return (
    <>
      {activePage == '/profile' &&
        <div className='profile'>
          { console.log('PROFILE RENDER') }
          <h2>Profile</h2>
          { profile ?
            <div>
              <h3>{ profile.firstName } { profile.lastName }</h3>
              {editing ?
                <div>
                  <ProfileForm profile={ profile } onComplete={ handleUpdate } />
                  <Button className='button' onClick={() => setEditing(false) }>
                    Cancel
                  </Button>
                </div>
              :
                <div>
                  <Button className='button' onClick={() => setEditing(true) }>
                    Edit Profile
                  </Button>
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

