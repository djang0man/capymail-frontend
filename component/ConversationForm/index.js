import React, { useState } from 'react';
import validator from 'validator';

const emptyState = {
  title: '',
  titleDirty: false,
  titleError: 'Title is required.',
};

function ConversationForm(props) {
  const {
    profile,
    onComplete
  } = props;

  const [formState, setFormState] = useState(emptyState);

  const validateChange = (name, value) => {
    switch (name) {
      case 'title':
        if (value.length < 1) {
          return 'Title is required.';
        }
        return null;
      default:
        return null;
    }
  }

  const handleChange = e => {
    let { name, value } = e.target;

    setFormState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: validateChange(name, value),
    });
  }  

  const handleSubmit = e => {
    e.preventDefault();

    let { titleError } = formState;

    if (!titleError) {
      onComplete(formState);
      setFormState(emptyState);
    } else {
      setFormState({
        ...formState,
        submitted: true,
        titleDirty: true,
      });
    }
  }

  const {
    title,
    titleDirty,
    titleError
  } = formState;

  return (
    <form
      className='conversation-form'
      onSubmit={ handleSubmit }>

      {titleDirty &&
        <p className='alert'>{ titleError }</p>
      }

      <input
        className={ titleDirty && titleError ? 'invalid' : null }
        type='text'
        name='title'
        placeholder='Title'
        value={ title }
        onChange={ handleChange }
      />

      <button className='button' type='submit'>Create Conversation</button>
    </form>
  )
}

export default ConversationForm;

