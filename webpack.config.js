'use strict';

require('dotenv').config();

const {DefinePlugin, EnvironmentPlugin} = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const production = process.env.NODE_ENV === 'production';

let plugins = [
  new HTMLPlugin({template: `${__dirname}/index.html`,}),
  new DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
  new EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
  new MiniCssExtractPlugin({
    filename: 'bundle.[hash].css'
  }),
];

if(production){
  plugins = plugins.concat([
    new UglifyPlugin(),
    new CleanPlugin(),
  ]);
}

module.exports = {
  plugins,
  devtool: production ? undefined : 'source-map',
  entry: `${__dirname}/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
    publicPath: process.env.CLIENT_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test:  /\.(css|scss).*/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, 
              includePaths: [`${__dirname}/src/styles`],
            },
          }
        ]
      },
    ],
  },
};
