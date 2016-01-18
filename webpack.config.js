var path = require('path')
var webpack = require('webpack')

var buildPath = path.resolve(__dirname, 'public', 'build')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './web/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.resolve(__dirname, 'web'),
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: buildPath,
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
