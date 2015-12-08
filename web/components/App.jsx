import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import moment from 'moment';
import numeral from 'numeral';

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

    function getEnv() {
      if (!env.env || env.env === 'production') {
        return ''
      }

      if (env.env === 'development') {
        return <h3 className="env">Enviroment: Development</h3>
      }

      if (env.env === 'staging') {
        if (env.pr) {
          return <h3 className="env">Enviroment: Staging <a href={'https://github.com/mattcreager/jog/pulls/' + env.pr}>[link to PR]</a></h3>
        }

        return <h3 className="env">Enviroment: Staging</h3>
      }
    }

    function getNumber() {
      if (env.location === 'frankfurt') {
        return <h3 className="instructions">Text +49 15735982060 either GIF or JIF to vote</h3>
      }

      if (env.location === 'tokyo') {
        return <h3 className="instructions">Text +81 345402483 either GIF or JIF to vote</h3>
      }

      return <h3 className="instructions">Text 1 (650) 966 5443 either GIF or JIF to vote</h3>
    }

    return <div>
      { getEnv() }
      { getNumber() }
      <div className="chart gradient-primary">
        <div id="option-1" className="option">
        <div className="results">
          <div className="on" style={{width: jifPerc+'%'}}></div>
        </div>
        <h3 className="option-label">JIF
          <span className="count">{jifPerc ? numeral(jifPerc/100).format('0%') : ''}</span>
        </h3>
      </div>
      <div className="between">VS</div>
        <div id="option-2" className="option">
        <div className="results">
          <div className="on" style={{width: gifPerc+'%'}}></div>
        </div>
        <h3 className="option-label">GIF
          <span className="count">{gifPerc ? numeral(gifPerc/100).format('0%') : ''}</span>
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
