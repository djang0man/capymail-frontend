import './dashboard.scss';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConversationForm from '../ConversationForm';
import * as messageActions from '../../action/message.js';
import * as conversationActions from '../../action/conversation.js';

class Dashboard extends React.Component {
  componentDidMount() {
    let {
      profile,
    } = this.props;

    if (!profile) {
      this.props.history.push('/profile');
    }

    this.props.unsetMessages();
    this.props.fetchConversations();
    this.props.unsetConversation();
  }
  
  render(){
    let {
      conversations,
      conversationCreate
    } = this.props;

    return (
      <div className='dashboard'>
        <h3>Conversations</h3>
        <ol className='conversations'> 
          {conversations.map((conversation, key) => 
            <li key={ key }>
              <Link to={ `conversations/${conversation._id}` }>{ conversation.title }</Link>
            </li>
          )}
        </ol>
        <ConversationForm onComplete={ conversationCreate } />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  conversations: state.conversations
});

let mapDispatchToProps = (dispatch) => ({
  unsetMessages: () => dispatch(messageActions.unset()),
  fetchConversations: () => dispatch(conversationActions.fetch()),
  unsetConversation: () => dispatch(conversationActions.unset()),
  conversationCreate: (conversation) => dispatch(conversationActions.createRequest(conversation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

