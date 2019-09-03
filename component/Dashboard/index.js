import './dashboard.scss';

import React, { useState } from 'react';
import moment from 'moment';

import { useAppContext } from '../App';

import Button from '../Button';
import Conversation from '../Conversation';
import ConversationForm from '../ConversationForm';

import * as networkConversation from '../../lib/network/conversation.js';

function Dashboard() {
  const {
    token,
    profile,
    conversations,
    onSetConversations,
  } = useAppContext();

  if (!token || !profile) {
    return null;
  }

  if (!conversations.length > 0) {
    networkConversation.fetch(token, profile)
      .then(conversations => {
        onSetConversations(conversations)
      });
  }

  const handleConversationCreate = conversation => {
    const payload = { ...conversation, profile };

    networkConversation.create(token, payload)
      .then(conversation => {
        onSetConversations([...conversations, conversation]);
      })
    .catch(console.error);
  }

  const [conversation, setConversation] = useState(null);
  function onSetConversation(conversation) {
    setConversation(conversation);
  }

  return (
    <>
      {profile &&
        <div className='dashboard'>
          { console.log('DASHBOARD RENDER') }
          <h3>Conversations</h3>
          <ol className='conversations'>
            {conversations.map((conversation, key) =>
              <li key={ key }>
                <Button onClick={ () => onSetConversation(conversation) }>{ conversation.title }</Button>
              </li>
            )}
          </ol>
          <Conversation token={ token } profile={ profile } conversation={ conversation } />

          {conversation === null &&
            <ConversationForm onComplete={ handleConversationCreate } />
          }
        </div>
      }
    </>
  )
}

export default Dashboard;

