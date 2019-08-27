import './dashboard.scss';

import React, { useRef, useEffect, useState } from 'react';
import moment from 'moment';

import Button from '../Button';
import Conversation from '../Conversation';
import ConversationForm from '../ConversationForm';

import * as networkConversation from '../../lib/network/conversation.js';

function Dashboard(props) {
  const {
    token,
    profile,
    conversations,
    onSetConversations,
    activePage
  } = props;

  if (!token || !profile) {
    return null;
  }

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      networkConversation.fetch(token, profile)
        .then(conversations => {
          onSetConversations(conversations)
        });
      didMountRef.current = true;
    }
  }, [onSetConversations]);

  const handleConversationCreate = conversation => {
    const payload = { ...conversation, profile };

    networkConversation.create(token, payload)
      .then(() => {
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
      {profile && activePage == '/dashboard' &&
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
            <ConversationForm profile={ profile } onComplete={ handleConversationCreate } />
          }
        </div>
      }
    </>
  )
}

export default Dashboard;

