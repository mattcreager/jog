import {Map} from 'immutable';

function setTopApps(state, topApps) {
  return state.set('topApps', topApps);
}

function setRequestMetrics(state, requestMetrics) {
  return state.set('requestMetrics', requestMetrics)
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_TOP_APPS':
      return setTopApps(state, action.topApps);
    case 'SET_REQUEST_METRICS':
      return setRequestMetrics(state, action.requestMetrics)
  }
  return state;
}
