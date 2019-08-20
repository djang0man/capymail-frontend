import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import EventListener, { withOptions } from 'react-event-listener';
import * as messageActions from '../../action/message.js';

class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  // HACK
  handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      window.setTimeout(() => {
        this.props.fetchMessages();
      }, 1000);
    }
  }

  render() {
    let { messages } = this.props;

    return (
      <div className='messages'>
        <ul> 
          {messages.map((message, key) => 
            <li key={ key }>
              <p className='author'>
                From { message.senderEmail }<br />
                Sent on { moment(message.created).format('MMMM Do YYYY, h:mm:ssa') }
              </p> 
              <div className='message' dangerouslySetInnerHTML={{__html: message.content}} />
            </li>
          )}
        </ul>
        <EventListener
          target='document'
          onVisibilityChange={ this.handleVisibilityChange }
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  messages: state.messages,
  conversation: state.conversation,
});

let mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(messageActions.fetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation); 

