export function setTopApps(topApps) {
  return {
    type: 'SET_TOP_APPS',
    topApps
  };
}

export function setRequestMetrics(requestMetrics) {
  return {
    type: 'SET_REQUEST_METRICS',
    requestMetrics
  }
};
