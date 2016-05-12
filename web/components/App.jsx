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

      if (env.env === 'review') {
        return <div className="alert alert-success text-center u-margin-As"><p className="env test">Enviroment: <strong>Review App <a href={'https://github.com/mattcreager/jog/pull/' + env.pr}>[PR #{env.pr}]</a></strong></p></div>
      }

      if (env.env === 'staging') {
        return <div className="alert alert-info text-center u-margin-As"><p className="env test">Enviroment: Staging</p></div>
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

      <header className="row text-center">
        <h2>Text <strong>GIF</strong> or <strong>JIF</strong> to vote</h2>
        <div className="col-md-4 col-md-offset-4">
          <div className="panel u-margin-Ts u-padding-Bs">
            { getNumber() }
          </div>
        </div>
      </header>

      <div className="chart">
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

      <footer className="text-center">
       <p> &copy; 2016 Heroku</p>
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
