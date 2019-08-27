import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';

let emptyState = {
  recipientEmail: '',
  recipientEmailDirty: false,
  recipientEmailError: 'Email is required',
  subject: '',
  subjectDirty: false,
  content: '',
  contentDirty: false,
  contentError: 'Content is required',
  submitted: false
};

function MessageForm(props) {
  const {
    profile,
    onComplete
  } = props;
  
  emptyState = {
    ...emptyState,
    'senderEmail': profile.email,
    'senderFirstName': profile.firstName,
    'senderLastName': profile.lastName
  }

  const [formState, setFormState] = useState(emptyState);

  const validateChange = (name, value) => {
    switch (name) {
      case 'content':
        if (validator.isEmpty(value)) {
          return  'Please provide message content.';
        }
        return null;
      case 'recipientEmail':
        if (!validator.isEmail(value)) {
          return  'Please provide a valid email.';
        }
        return null;
      default:
        return null;
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: validateChange(name, value)
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    const { recipientEmailError, contentError } = formState;

    if (!recipientEmailError && ! contentError) {
      onComplete(formState);
      setFormState(emptyState);
    } else {
      setFormState({
        ...formState,
        submitted: true,
        subjectDirty: true,
        contentDirty: true,
        recipientEmailDirty: true
      });
    }
  }
  
  const {
    recipientEmail,
    recipientEmailDirty,
    recipientEmailError,
    subject,
    subjectDirty,
    content,
    contentDirty,
    contentError
  } = formState;

  return (
    <form 
      onSubmit={ handleSubmit }
      className='message-form'
    >
      
      <div>
        {recipientEmailDirty && 
          <p className='alert'>{ recipientEmailError }</p>
        }
        <input
          className={ recipientEmailDirty && recipientEmailError ? 'invalid' : null }
          type='email'
          name='recipientEmail'
          value={ recipientEmail }
          onChange={ handleChange }
          placeholder='recipient email'
        />
      </div>

      <div>
        <input
          type='text'
          name='subject'
          value={ subject }
          onChange={ handleChange }
          placeholder='message subject'
        />
      </div>
      
      {contentDirty &&
        <p className='alert'>{ contentError }</p>
      } 
      
      <div>
        <textarea
          className={ contentDirty && contentError ? 'invalid' : null }
          name='content'
          value={ content }
          onChange={ handleChange }
          placeholder='message content'
        />
      </div>

      <button className='button' type='submit'>Send Message</button>
    </form>
  )
}

export default MessageForm;

