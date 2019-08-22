import './dashboard.scss';

import React, { useRef, useEffect } from 'react';
import moment from 'moment';

import Button from '../Button';
import ConversationForm from '../ConversationForm';

import * as networkMessage from '../../network/message.js';
import * as networkConversation from '../../network/conversation.js';

function Dashboard(props) {
  const {
    token,
    profile,
    conversations,
    onSetConversations,
    activePage
  } = props;

  const didMountRef = useRef(false);

  useEffect(() => {
    if (token && profile) {
      if (!didMountRef.current) {
        networkConversation.fetch(token, profile)
          .then(conversations => {
            console.log('CONVERSATIONS: ', conversations)
            onSetConversations(conversations)
          });
        didMountRef.current = true;
      }
    }
  }, [onSetConversations]);

  return (
    <>
      {profile && activePage == '/dashboard' &&
        <div className='dashboard'>
          { console.log('DASHBOARD RENDER') }
          <h3>Conversations</h3>
          <ol className='conversations'>
            {conversations.map((conversation, key) =>
              <li key={ key }>
                <Button to={ `conversations/${conversation._id}` }>{ conversation.title }</Button>
              </li>
            )}
          </ol>
          {
            //<ConversationForm onComplete={ conversationCreate } />
          }
        </div>
      }
    </>
  )
}

export default Dashboard;

