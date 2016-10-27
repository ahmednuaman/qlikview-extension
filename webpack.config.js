'use strict'

const CWD = process.cwd()
const ENV = process.env.NODE_ENV || 'development'
const PRODUCTION = ENV === 'production'

const path = require('path')
const src = path.resolve(CWD, 'src')
const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackCopyPlugin = require('copy-webpack-plugin')
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

let config = {
  context: src,
  cache: true,
  entry: {
    'script.js': './js/app.js',
    'asset/css/app.css': './scss/app.scss'
  },
  output: {
    filename: '[name]',
    publicPath: '',
    path: path.resolve(CWD, 'build')
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: 'file?name=asset/font/[name].[ext]?[hash]'
    }, {
      test: /img\/.+\.(jpe?g|png|gif|svg)$/,
      loader: 'url?limit=1000&name=asset/img/[name].[ext]?[hash]!img?progressive=true'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx?$/,
      exclude: [
        /node_modules/
      ],
      loader: 'babel?compact=false'
    }, {
      test: /\.scss$/,
      loader: WebpackExtractTextPlugin.extract('style', 'css!sass')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.jpg', '.jpeg', '.gif', '.png', '.svg'],
    alias: {
      img: `${src}/img/`
    }
  },
  plugins: [
    new WebpackCleanPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackProgressBarPlugin(),
    new WebpackExtractTextPlugin('[name]', {
      allChunks: true
    }),
    new WebpackCopyPlugin(['css', 'img', 'font'].map((dir) => ({
      from: '../qlik/folder-definition.xml',
      to: `./asset/${dir}/definition.xml`
    })))
  ]
}

if (PRODUCTION) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])

  config.devtool = null
}

module.exports = config
