import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import numeral from 'numeral';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    topApps: React.PropTypes.instanceOf(List).isRequired,
    messageWhenEmpty: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      messageWhenEmpty: 'No domains seen'
    };
  },
  render: function () {
    return <table className="table table-striped">
      <thead>
        <tr>
         <th>Domain name</th>
         <th># of requests</th>
         <th>Tenkara</th>
        </tr>
      </thead>
      <tbody>
        {this.props.topApps.map(app =>
          <tr key={app.get('app')}>
            <td><a href="{app.get('app')}"><strong>{app.get('app')}</strong></a></td>
            <td>{numeral(app.get('count')).format('0,0')}</td>
            <td><a href={'https://tenkara.herokuapp.com/search?q=' + app.get('app').split('.')[0]}>View</a></td>
          </tr>
        )}
      </tbody>
    </table>
  }
});
