/*
 * @Author: Yang LeiLei
 * @Date: 2018-12-09 00:19:11
 * @LastEditors: Yang LeiLei
 * @LastEditTime: 2018-12-09 00:56:04
 * @Description: 需要自己从新配置
 * @github: https://github.com/webpack-contrib/webpack-hot-middleware
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});