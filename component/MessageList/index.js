import React from 'react';
import moment from 'moment';

function MessageList(props) {
  const { messages } = props;

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
    </div>
  )
}

export default MessageList;

