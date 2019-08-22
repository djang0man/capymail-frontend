import React, { useState } from 'react';
import validator from 'validator';

const emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First name is required.',
  lastName: '',
  lastNameDirty: false,
  lastNameError: 'Last name is required.',
};

function ProfileForm(props) {
  const { profile, onComplete } = props;

  const [localProfile, setLocalProfile]
    = useState(profile ? { ...emptyState, ...profile } : emptyState);
  
  const validateChange = (name, value) => {
    switch (name) {
      case 'firstName':
        if (value.length < 1) {
          return 'First Name is required.';
        }
        if (!validator.isAlpha(value)) {
          return 'First Name can only contain letters.';
        }
        return null;
      case 'lastName':
        if (value.length < 1) {
          return 'Last Name is required.';
        }
        if (!validator.isAlpha(value)) {
          return 'Last Name can only contain letters.';
        }
        return null;
      default:
        return null;
    }
  }

  const handleChange = e => {
    let { name, value } = e.target;

    setLocalProfile({
      ...localProfile,
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: validateChange(name, value),
    });
  }  

  const handleSubmit = e => {
    e.preventDefault();

    onComplete(localProfile);
    setLocalProfile(emptyState);
  }

  const {
    email,
    firstName,
    firstNameDirty,
    firstNameError,
    lastName,
    lastNameDirty,
    lastNameError
  } = localProfile;

  return (
    <form
      className='profile-form'
      onSubmit={ handleSubmit }>

      { console.log('PROFILEFORM RENDER') }

      {email &&
        <input
          type='text'
          name='email'
          readOnly='readOnly'
          value={ email }
        />
      }

      {firstNameDirty &&
        <p className='alert'>{ firstNameError }</p>
      }

      <input
        className={ firstNameDirty && firstNameError ? 'invalid' : null }
        type='text'
        name='firstName'
        placeholder='First Name'
        value={ firstName }
        onChange={ handleChange }
      />

      {lastNameDirty &&
        <p className='alert'>{ lastNameError }</p>
      }

      <input
        className={ lastNameDirty && lastNameError ? 'invalid' : null }
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={ lastName }
        onChange={ handleChange }
      />

      <button className='button' type='submit'>{ localProfile ? 'update' : 'create' } Profile</button>
    </form>
  )
}

export default ProfileForm;

