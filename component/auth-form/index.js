import React from 'react';
import validator from 'validator';
import * as util from '../../lib/util.js';

let emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Conversation Name is required',
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
    if (this.props.type === 'enter') {
      return null;
    }
    switch (name) {
      case 'username':
        if (value.length < 6) {
          return 'Conversation Username requires 6 or more characters';
        }
        if (!validator.isAlphanumeric(value)) {
          return 'Conversation Username requires letters and numbers';
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
    let {name, value} = e.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.validateChange(name, value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let {nameError, emailError, passwordError} = this.state;
    if (this.props.type === 'enter' || !nameError && !emailError && !passwordError) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
        submitted: true
      });
    }
  }
  
  render() {
    let {
      type,
    } = this.props;

    type = type === 'enter' ? type : 'create';

    return (
      <form 
        className='auth-form'
        noValidate
        onSubmit={this.handleSubmit}>

        {util.renderIf(this.state.usernameDirty, 
          <p className='alert'>{this.state.usernameError}</p>)}
        <input
          className={util.renderIf(
            this.state.usernameDirty && this.state.usernameError, 'invalid')}
          name='username'
          placeholder='conversation username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />

        {util.renderIf(type != 'enter',
          <div>
            {util.renderIf(this.state.emailDirty, 
              <p className='alert'>{this.state.emailError}</p>)}
            <input
              className={util.renderIf(
                this.state.emailDirty && this.state.emailError, 'invalid')}
              name='email'
              placeholder='sender email'
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
        )}

        {util.renderIf(this.state.passwordDirty, 
          <p className='alert'>{this.state.passwordError}</p>)}
        <input
          className={util.renderIf(
            this.state.passwordDirty && this.state.passwordError, 'invalid')}
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button className='button' type='submit'>{type}</button>
      </form>
    )
  }
}

export default AuthForm;
