import React, { useState } from 'react';

import ProfileForm from '../ProfileForm';

import * as profile from '../../network/profile.js';

import { useAppContext } from '../App';

function Profile(props) {
  const [editing, setEditing] = useState(false);

  const handleCreate = profile => {
    profile.create(profile)
      .then(() => {
        props.history.push('/dashboard');
      });
  }

  const handleUpdate = profile => {
    profile.update(profile);
    setEditing(true);
  }

  const {
    profile, 
  } = useAppContext();

  return (
    <div className='profile'> 
      { console.log('PROFILE RENDER') }
      <h2>Profile</h2>
      { profile ? 
        <div>
          <h3>{ profile.firstName } { profile.lastName }</h3>
          {editing ? 
            <div>
              <ProfileForm profile={ profile } onComplete={ handleUpdate } />
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
  )
}

export default Profile;

