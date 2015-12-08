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
        return <p className="env">Enviroment: <strong>Development</strong></p>
      }

      if (env.env === 'staging') {
        if (env.pr) {
          return <p className="env">Enviroment: <strong>Staging <a href={'https://github.com/mattcreager/jog/pulls/' + env.pr}>[link to PR]</strong></a></p>
        }

        return <p className="env">Enviroment: Staging</p>
      }
    }

    function getNumber() {
      if (env.location === 'frankfurt') {
        return <h2 className="instructions"><span className="flag-de"></span> +49 15735982060</h2>
      }

      if (env.location === 'tokyo') {
        return <h2 className="instructions"><span className="flag-jp"></span> +81 345402483</h2>
      }

      return <h2 className="instructions"><span className="flag-us"></span> 1-(650)-966-5443</h2>
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
