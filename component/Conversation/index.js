import './conversation.scss';

import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList';
import MessageForm from '../MessageForm';
import * as messageActions from '../../action/message.js';
import * as conversationActions from '../../action/conversation.js';

class Conversation extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.fetchConversationById(id);
    this.props.fetchMessagesById(id);
  }

  render() {
    let { conversation, messages } = this.props;

    return (
      <div className='conversation'>
        {conversation.title &&
          <h2>{ conversation.title }</h2>
        }

        {conversation.title && messages.length > 0 &&
          <>
            <h3>Messages</h3>
            <MessageList messages={ messages } />
          </>
        }

        <MessageForm onComplete={ this.props.messageCreate } />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  messages: state.messages,
  conversation: state.conversation
});

let mapDispatchToProps = (dispatch) => ({
  fetchMessagesById: (id) => dispatch(messageActions.fetchById(id)),
  fetchConversationById: (id) => dispatch(conversationActions.fetchById(id)),
  messageCreate: (message) => dispatch(messageActions.createRequest(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

