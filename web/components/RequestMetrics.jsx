import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Map} from 'immutable';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    metrics: React.PropTypes.instanceOf(Map).isRequired
  },
  renderTimeStatistic: function (ms) {
    if ('undefined' === typeof(ms) || null === ms) {
      return '␀';
    } else {
      return `${ms}ms`;
    }
  },
  renderTimeStatistics: function (metricName, timeStatistics) {
    const numStats = timeStatistics.size;
    if (numStats === 0) return null;

    const ordered = timeStatistics.sortBy((time, label) => label);
    const [firstLabel, firstTime] = ordered.entrySeq().first();
    const rest = ordered.rest();

    return <tbody>
      <tr>
        <th rowSpan={numStats}>{metricName}</th>
        <th>{firstLabel}</th>
        <td>{this.renderTimeStatistic(firstTime)}</td>
      </tr>
      {rest.map((time, label) =>
        <tr key={label}>
          <th>{label}</th>
          <td>{this.renderTimeStatistic(time)}</td>
        </tr>
      ).valueSeq()}
    </tbody>;
  },
  render: function () {
    return <article>
      <table className="table table-condensed table-hover">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>QPS</th>
            <th>mean</th>
            <td>{this.props.metrics.get('qps')}</td>
          </tr>
        </tbody>
        {this.renderTimeStatistics('Connect time', this.props.metrics.get('timeConnect', Map()))}
        {this.renderTimeStatistics('Service time', this.props.metrics.get('timeService', Map()))}
      </table>
    </article>;
  }
});
