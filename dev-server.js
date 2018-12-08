/*
 * @Author: Yang LeiLei
 * @Date: 2018-12-09 00:27:39
 * @LastEditors: Yang LeiLei
 * @LastEditTime: 2018-12-09 00:50:10
 * @Description: 此文件采用的是webpack自己定义的webpack-dev-server
 */
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
