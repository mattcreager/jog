import path from 'path';
import express from 'express';
import logger from 'morgan';
import {Server} from 'http';
import {createProxyServer} from 'http-proxy';
import Io from 'socket.io';
import immutable from 'immutable';
import twilio from 'twilio';
import bodyParser from 'body-parser';
import _ from 'lodash'

import config from '../config/env';

const publicPath = path.resolve(__dirname, '..', 'public');

const app = express();
const server = Server(app);
const io = Io(server);

let results = {
  gif: 0,
  jif: 0
}

app.use(logger(config.isProduction ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(publicPath));

if (!config.isProduction) {
  const proxy = createProxyServer();

  const bundle = require('./bundle.js');
  bundle();

  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

  proxy.on('error', function (e) {
    console.log('Could not connect to proxy, please try again...');
  });
}

  app.post('/sms', function (req, res) {
    if (!req.body.Body) return

    let body = _.trim(req.body.Body.toLowerCase())

    if (!_.startsWith(body, 'g') && !_.startsWith(body, 'j')) return

    let vote = _.startsWith(body, 'g') ? 'gif' : 'jif'

    results[vote]++

    var resp = new twilio.TwimlResponse()

    res.writeHead(200, { 'Content-Type':'text/xml' })
    res.end(resp.sms(`Thanks for weighing in!`).toString())
  });

  const lastData = {
    'top-apps': immutable.Map(),
    'request-metrics': immutable.Map()
  };

  server.listen(config.httpPort, () => console.log(`Server listening on ${config.httpPort}`));

  io.on('connection', (socket) => {
    console.log('Socket connected');

    // bring the new client up to speed
    socket.emit('results', results);

    setInterval(function() {
      socket.emit('results', results);
    }, 500)

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });

