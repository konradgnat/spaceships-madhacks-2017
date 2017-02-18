var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require("path");
//comment
module.exports = {
  entry: {
    app: ['./src/index.js', './static/index.html', './static/styles/main.css']
  },
  output: {
    path: __dirname + '/build',
    filename: "index.bundle.js",
  },
  devServer: {
    contentBase: path.resolve( __dirname , 'build'),
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: "raw-loader"},
      {test: /\.js$/, exclude: [/node_modules/], loaders: ['babel-loader']},
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
    new webpack.EnvironmentPlugin({NODE_ENV: 'development'})
  ],
  devtool: 'source-map'
};
