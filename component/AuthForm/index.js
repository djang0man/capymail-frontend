import React from 'react';
import validator from 'validator';

let emptyState = {
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

class AuthForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = emptyState;
    this.handleChange = this.handleChange.bind(this);
    this.validateChange = this.validateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateChange(name, value) {
    if (this.props.type === 'login') {
      return null;
    }

    switch (name) {
      case 'username':
        if (value.length < 6) {
          return 'Username requires 6 or more characters';
        }
        if (!validator.isAlphanumeric(value)) {
          return 'Conversation Name requires letters and numbers';
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

  handleChange(e) {
    let { name, value } = e.target;

    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.validateChange(name, value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let { type } = this.props;

    let {
      nameError,
      emailError,
      passwordError 
    } = this.state;

    if (type === 'login' || !nameError && !emailError && !passwordError) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        submitted: true,
        emailDirty: true,
        usernameDirty: true,
        passwordDirty: true,
      });
    }
  }
  
  render() {
    let { type } = this.props;

    let {
      username,
      usernameError,
      usernameDirty,
      email,
      emailDirty,
      emailError,
      password,
      passwordDirty,
      passwordError
    } = this.state;

    type = type === 'login' ? type : 'signup';

    return (
      <form 
        className='auth-form'
        noValidate
        onSubmit={ this.handleSubmit }>

        {usernameDirty &&
          <p className='alert'>{ usernameError }</p>
        }
        <input
          className={ usernameDirty && usernameError ? 'invalid' : null }
          type='text'
          name='username'
          placeholder='username'
          value={ username }
          onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
          onChange={ this.handleChange }
        />

        <button className='button' type='submit'>{ type }</button>
      </form>
    )
  }
}

export default AuthForm;

