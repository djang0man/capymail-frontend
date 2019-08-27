import './conversation.scss';

import React, { useEffect, useState } from 'react';

import MessageList from '../MessageList';
import MessageForm from '../MessageForm';

import * as networkMessage from '../../lib/network/message.js';

function Conversation(props) {
  const {
    token,
    profile,
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

  const handleMessageCreate = message => {
    networkMessage.create(token, conversation, message)
      .then(() => {
        setMessages([...messages, message]);
      })
    .catch(console.error);
  }

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

      <MessageForm profile={ profile } onComplete={ handleMessageCreate } />
    </div>
  )
}

export default Conversation;

