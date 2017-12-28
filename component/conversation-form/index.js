import React from 'react';
import validator from 'validator';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';

let emptyState = {
  title: '',
  titleDirty: false,
  titleError: 'Title is required.',
};

class ConversationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // jshint ignore:start
      ...emptyState,
      // jshint ignore:end
      profile: this.props.profile,
    };
    
    // jshint ignore:start
    this.emptyState = {...this.state};
    // jshint ignore:end
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateChange = this.validateChange.bind(this);
  } 

  validateChange(name, value) {
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
    console.log(this.state);
    let {titleError} = this.state;
    if (!titleError) {
      this.props.onComplete(this.state);
      this.setState(this.emptyState);
    } else {
      this.setState({
        submitted: true,
        titleDirty: true,
      });
    }
  }

  render() {
    return (
      <form
        className='conversation-form'
        onSubmit={this.handleSubmit}>
        
        {util.renderIf(this.state.titleDirty, 
          <p className='alert'>{this.state.titleError}</p>)}
        <input
          className={util.renderIf(
            this.state.titleDirty && this.state.titleError, 'invalid')}
          name='title'
          placeholder='Title'
          type='text'
          value={this.state.title}
          onChange={this.handleChange}
        />
        
        <button className='button' type='submit'>Create Conversation</button>
      </form>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ConversationForm);
