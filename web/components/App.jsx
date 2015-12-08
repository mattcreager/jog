import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import moment from 'moment';
import numeral from 'numeral';

import Leaderboard from './Leaderboard';
import Hud from './Hud';

const App = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    topApps: React.PropTypes.instanceOf(Map).isRequired,
    requestMetrics: React.PropTypes.instanceOf(Map).isRequired
  },
  render: function () {
    let env = this.props.requestMetrics.toJSON()
    let votes = this.props.topApps.toJSON()

    console.log(env)

    let totalVotes = votes['gif']+votes['jif']
    let gifPerc = votes['gif']/totalVotes*100
    let jifPerc = votes['jif']/totalVotes*100

    return <div>
      <div className="chart">
    <div id="option-1" className="option">
      <div className="results">
        <div className="on" style={{width: gifPerc+'%'}}></div>
      </div>
      <h3 className="option-label">GIF
        <span className="count">{numeral(gifPerc/100).format('0%')}</span>
      </h3>
    </div>
    <div className="between">VS</div>
    <div id="option-2" className="option">
      <div className="results">
        <div className="on" style={{width: jifPerc+'%'}}></div>
      </div>
      <h3 className="option-label">JIF
        <span className="count">{numeral(jifPerc/100).format('0%')}</span>
      </h3>
    </div>
  </div>

      <footer className="text-center container">
       <p className="text-muted"> &copy; 2015 Heroku</p>
      </footer>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    topApps: state.get('topApps', Map()),
    requestMetrics: state.get('requestMetrics', Map())
  };
}

export const AppContainer = connect(mapStateToProps)(App);
