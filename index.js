'use strict';

require('dotenv').config();

const express = require('express');

express()
  .use(express.static(`${__dirname}/build`))
  .get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`))
  .listen(process.env.PORT, () => {
    console.log('server up', process.env.PORT);
});

