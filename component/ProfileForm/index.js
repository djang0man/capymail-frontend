import React from 'react';
import validator from 'validator';

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

    this.state = props.profile ? { ...emptyState, ...props.profile } : emptyState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState(props.profile);
    }
  }

  validateChange(name, value) {
    if (this.props.type === 'login') {
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
    let { name, value } = e.target;

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
    let {
      email,
      firstName,
      firstNameDirty,
      firstNameError,
      lastName,
      lastNameDirty,
      lastNameError,
      profile
    } = this.state;

    return (
      <form
        className='profile-form'
        onSubmit={ this.handleSubmit }>
        
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
          onChange={ this.handleChange }
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
          onChange={ this.handleChange }
        />

        <button className='button' type='submit'>{ profile ? 'update' : 'create' } Profile</button>
      </form>
    )
  }
}

export default ProfileForm;

