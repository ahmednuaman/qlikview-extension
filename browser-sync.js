'use strict'

const CWD = process.cwd()
const DIR = 'build'

const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const bundler = webpack(webpackConfig)
const serverPath = path.resolve(CWD, DIR)

require('browser-sync')
  .create()
  .init({
    server: {
      baseDir: serverPath,
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: false
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      `${DIR}/asset/css/*.css`,
      `${DIR}/asset/font/*`,
      `${DIR}/asset/img/*`,
      `${DIR}/*.html`
    ],
    open: 'external'
  }, () => console.log('Browsersync is running...'))
