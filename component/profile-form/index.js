import React from 'react';
import validator from 'validator';
import * as util from '../../lib/util.js';

let emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First name is required.',
  lastName: '',
  lastNameDirty: false,
  lastNameError: 'Last name is required.',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? {...emptyState, ...props.profile} : emptyState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState(props.profile);
    }
  }

  validateChange(name, value) {
    if (this.props.type === 'enter') {
      return null;
    }
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
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>
        
        {util.renderIf(this.state.email,
          <input
            name='email'
            type='text'
            value={this.state.email}
            readOnly='readOnly'
          />)}

        {util.renderIf(this.state.firstNameDirty, 
          <p className='alert'>{this.state.firstNameError}</p>)}
        <input
          className={util.renderIf(
            this.state.firstNameDirty && this.state.firstNameError, 'invalid')}
          name='firstName'
          placeholder='First Name'
          type='text'
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        
        {util.renderIf(this.state.lastNameDirty, 
          <p className='alert'>{this.state.lastNameError }</p>)}
        <input
          className={util.renderIf(
            this.state.lastNameDirty && this.state.lastNameError, 'invalid')}
          name='lastName'
          placeholder='Last Name'
          type='text'
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <button className='button' type='submit'>{this.props.profile ? 'update' : 'create'} Sender</button>
      </form>
    )
  }
}

export default ProfileForm;
