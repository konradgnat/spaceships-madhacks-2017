var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require("path");
//comment
module.exports = {
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: "index.bundle.js",
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: "raw-loader"},
      {test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader', query: {
        presets: ['es2015']
      }},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.png$/, loader: "url-loader?limit=100000"},
      {test: /\.jpg$/, loader: "file-loader"}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'static/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'SERVER_HOSTNAME', 'SERVER_PORT'])
  ],
};
