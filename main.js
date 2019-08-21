import React from 'react';
import ReactDom from 'react-dom';

import './lib/realtime.js';

import App from './component/App';

let container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(<App />, container);

