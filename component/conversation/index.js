import './conversation.scss';

import React from 'react';
import {connect} from 'react-redux';
import MessageList from '../message-list';
import MessageForm from '../message-form';
import * as messageActions from '../../action/message.js';
import * as conversationActions from '../../action/conversation.js';

class Conversation extends React.Component {
  componentWillMount() {
    let id = this.props.match.params.id;
    this.props.fetchConversationById(id);
  }
  render() {
    let {conversation} = this.props;
    let id = this.props.match.params.id;
    return (
      <div className='conversation'>
        <h2>{conversation.title}</h2>
        <h3>Messages</h3>
        <MessageList conversationId={id} /> 
        <MessageForm onComplete={this.props.messageCreate} />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  conversation: state.conversation,
});

let mapDispatchToProps = (dispatch) => ({
  messageCreate: (message) => dispatch(messageActions.createRequest(message)),
  fetchConversationById: (id) => dispatch(conversationActions.fetchById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
