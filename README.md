# log-dashboard-web

This is a web UI for displaying real-time log analytics calculated by
[log-dashboard-samza](https://github.com/heroku/log-dashboard-samza), intended
to be used in conjunction with
[drain-to-kafka](https://github.com/heroku/drain-to-kafka).

## Features

* Shows the most frequently seen IP addresses accessing the monitored app, over
  the last 60 seconds, and over all time.
* Preliminary support (on a
  [branch](https://github.com/heroku/log-dashboard-web/tree/request-metrics))
  for displaying request metrics over the last 60 seconds - QPS, mean and
  quantile response times.  This does not yet behave correctly if the log stream
  has more than one partition, hence being relegated to a dev branch.

## Design

The server uses Node.js to serve the client assets, a [Kafka
consumer](https://www.npmjs.com/package/kafkaesque) to listen to the analytics
topics, and [Socket.io](http://socket.io/) to forward updates to the client.  In
development mode the server also proxies asset requests through
[webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) to
enable automatic rebundling and hot module reloading.

The client is a [React](https://facebook.github.io/react/) application with
state managed by [redux](https://github.com/rackt/redux).  It uses
[purple](https://github.com/heroku/purple) for UI.  It relies on
[webpack](https://webpack.github.io/) for transpilation, module loading and
asset bundling.

## Running on Heroku

No Heroku button because you need to attach an existing Kafka addon.

```bash
# create app in the same space as your drain-to-kafka instance
heroku apps:create your-log-dashboard --space your-space

# grab the Kafka addon name from drain-to-kafka
heroku addons --app your-drain-to-kafka

# attach Kafka
heroku addons:attach <name of the Kafka addon from your-drain-to-kafka>

# deploy app
git push heroku master
```
