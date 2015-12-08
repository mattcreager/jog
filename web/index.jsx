import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {Map, fromJS} from 'immutable';

import reducer from './reducer';
import {setTopApps} from './actionCreators.js';
import {setRequestMetrics} from './actionCreators.js';
import {AppContainer} from './components/App';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:${location.port}`);

socket.on('results', results => {
  store.dispatch(setTopApps(fromJS(results)));
});

socket.on('env', env => {
  store.dispatch(setRequestMetrics(fromJS(env)));
})

ReactDOM.render(
  // render with empty data initially; socket will fill it in
  <Provider store={store}>
    <AppContainer topApps={Map()} requestMetrics={Map()} />
  </Provider>,
  document.getElementById('app')
);
