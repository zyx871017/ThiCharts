/**
 * Created by zhaoyuxiang on 2017/3/24.
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/thiCharts.js',
    lib: './lib/controls/TrackballControls.js',
    example: './example/barExample.js',
    trackballExample: './example/trackball.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'three.js demo',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['example', 'home', 'lib'],
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'three.js demo',
      template: './entry/index.html',
      filename: 'trackballControls.html',
      chunks: ['trackballExample'],
      inject: 'body'
    })
  ]
};
