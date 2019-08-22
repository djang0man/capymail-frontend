import './conversation.scss';

import React, { useEffect, useState } from 'react';

import MessageList from '../MessageList';

import * as networkMessage from '../../lib/network/message.js';

function Conversation(props) {
  const {
    token,
    conversation
  } = props;

  if (!token || !conversation) {
    return null;
  }

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    networkMessage.fetch(token, conversation)
      .then(messages => {
        setMessages(messages)
      });
  }, [conversation]);

  const { title } = conversation;

  return (
    <div className='conversation'>
      {title &&
        <h2>{ title }</h2>
      }

      {title && messages.length > 0 &&
        <>
          <h3>Messages</h3>
          <MessageList messages={ messages } />
        </>
      }

      {
        // <MessageForm onComplete={ this.props.messageCreate } />
      }
    </div>
  )
}

export default Conversation;

