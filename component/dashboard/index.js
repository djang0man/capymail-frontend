import './dashboard.scss';

import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import EventListener, {withOptions} from 'react-event-listener';
import MessageForm from '../message-form';
import * as message from '../../action/message.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }
  handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      window.setTimeout(() => {
        this.props.fetchMessages();
      }, 1000);
    }
  }
  componentWillMount() {
    let {clientProfile} = this.props;
    if (!clientProfile) {
      this.props.history.push('/sender');
    }
    this.props.fetchMessages();
  }
  render(){
    let {clientProfile} = this.props;
    return (
      <div className='dashboard'>
        <h2>{clientProfile.username}</h2>
        <h3>Messages</h3>
        <ul> 
          {this.props.messages.map((message, key) => 
            <li className='conversation' key={key}>
              <p className='author'>From {message.senderEmail}<br />Sent on {moment(message.created).format('MMMM Do YYYY, h:mm:ssa')}</p> 
              <div className='message' dangerouslySetInnerHTML={{__html: message.content}} />
            </li>
          )}
        </ul>
        <MessageForm onComplete={this.props.messageCreate}/>
        <EventListener
          target='document'
          onVisibilityChange={this.handleVisibilityChange}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  messages: state.messages,
  clientProfile: state.clientProfile,
});

let mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(message.fetch()),
  messageCreate: (content) => dispatch(message.createRequest(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
