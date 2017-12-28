import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import './lib/realtime.js';
import reducer from './reducer';
import App from './component/app';
import thunk from './lib/redux-thunk.js';
import {persist} from './lib/redux-persist.js';
import reporter from './lib/redux-reporter.js';
import messageSubscriber from './subscriber/message.js';
import conversationSubscriber from './subscriber/conversation.js';

const store = createStore(reducer, applyMiddleware(thunk, persist(['profile']), reporter));

messageSubscriber(store);

console.log('INIT STATE', store.getState());

let container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
, container)
