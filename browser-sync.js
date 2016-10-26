'use strict'

const CWD = process.cwd()
const DIR = 'qlik'

const fs = require('fs')
const path = require('path')
const url = require('url')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const bundler = webpack(webpackConfig)
const serverPath = path.resolve(CWD, DIR)

require('browser-sync')
  .create()
  .init({
    baseDir: serverPath,
    files: [
      `${DIR}/assets/css/*.css`,
      `${DIR}/assets/font/*`,
      `${DIR}/assets/img/*`,
      `${DIR}/*.html`
    ],
    open: 'external',
    middleware: [
      (req, res, next) => {
        const requestURL = url.parse(req.url)
        const pathname = requestURL.pathname
        const exists = fs.existsSync(path.join(serverPath, pathname))

        if (!exists) {
          req.url = '/index.html'
        }

        return next()
      },
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: false
      }),
      webpackHotMiddleware(bundler)
    ]
  }, () => console.log('Browsersync is running...'))
