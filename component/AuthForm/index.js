import React, { useState } from 'react';
import validator from 'validator';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is required',
  email: '',
  emailDirty: false,
  emailError: 'Email is required',
  password: '',
  passwordDirty: false,
  passwordError: 'Password is required',
  submitted: false,
};

function AuthForm(props) {
  const { type, onComplete } = props;

  const [formState, setFormState] = useState(emptyState);

  const validateChange = (name, value) => {
    if (type === 'login') {
      return null;
    }

    switch (name) {
      case 'username':
        if (value.length < 6) {
          return 'Username requires 6 or more characters';
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return  'Please provide a valid email.';
        }
        return null;
      case 'password':
        if (value.length < 8) {
          return 'Password requires 8 or more characters';
        }
        return null;
      default:
        return null;
    }
  }

  const handleChange = e => {
    let { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: validateChange(name, value),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    let {
      nameError,
      emailError,
      passwordError 
    } = formState;

    if (type === 'login' || !nameError && !emailError && !passwordError) {
      onComplete(formState);
      setFormState(emptyState);
    } else {
      setFormState({
        ...formState,
        submitted: true,
        emailDirty: true,
        usernameDirty: true,
        passwordDirty: true,
      });
    }
  }
  
  const {
    username,
    usernameError,
    usernameDirty,
    email,
    emailDirty,
    emailError,
    password,
    passwordDirty,
    passwordError
  } = formState;


  return (
    <form
      className='auth-form'
      noValidate
      onSubmit={ handleSubmit }>

      { console.log('AUTHFORM RENDER') }

      {usernameDirty &&
        <p className='alert'>{ usernameError }</p>
      }
      <input
        className={ usernameDirty && usernameError ? 'invalid' : null }
        type='text'
        name='username'
        placeholder='username'
        value={ username }
        onChange={ handleChange }
      />

      {type != 'login' &&
        <div>
          {emailDirty &&
            <p className='alert'>{ emailError }</p>
          }
          <input
            className={ emailDirty && emailError ? 'invalid' : null }
            type='email'
            name='email'
            placeholder='email'
            value={ email }
            onChange={ handleChange }
          />
        </div>
      }

      {passwordDirty &&
        <p className='alert'>{ passwordError }</p>
      }
      <input
        className={ passwordDirty && passwordError ? 'invalid' : null }
        name='password'
        placeholder='password'
        type='password'
        value={ password }
        onChange={ handleChange }
      />

      <button className='button' type='submit'>{ type ? type : 'signup' }</button>
    </form>
  )
}

export default AuthForm;

