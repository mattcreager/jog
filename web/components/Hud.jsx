import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import numeral from 'numeral';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    // topIps: React.PropTypes.instanceOf(List).isRequired,
    // messageWhenEmpty: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      messageWhenEmpty: 'No Apps seen'
    };
  },
  render: function () {
    return <div className="stats container u-margin-Tl text-center">
      <div className="row">
        <div className="stat-panel col-md-3">
          <div className="panel">
            <h2 className="stat-num">{numeral(this.props.requestMetrics.get('qps')*60).format('0,0')}</h2>
            <h6 className="stat-label">Requests / min</h6>
          </div>
        </div>
        <div className="stat-panel col-md-3">
          <div className="panel">
            <h2 className="stat-num">{this.props.requestMetrics.getIn(['timeService', 'pct95'])} ms</h2>
            <h6 className="stat-label">95<sup>th</sup> / %</h6>
          </div>
        </div>
        <div className="stat-panel col-md-3">
          <div className="panel">
            <h2 className="stat-num">{this.props.requestMetrics.getIn(['timeService', 'mean'])} ms</h2>
            <h6 className="stat-label">Avg response time</h6>
          </div>
        </div>
        <div className="stat-panel col-md-3">
          <div className="panel">
            <h2 className="stat-num">{this.props.requestMetrics.getIn(['timeService', 'pct50'])} ms</h2>
            <h6 className="stat-label">50<sup>th</sup> / %</h6>
          </div>
        </div>
      </div>
    </div>;
  }
});
