const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@blazor': path.join(__dirname, '../Microsoft.AspNetCore.Blazor.Browser.JS/package/index.d.ts')
    }
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
    noParse: [/moment.js/]
  },
  entry: { 'blazor.forms.datepicker': './src/Boot.ts' },
  output: { path: path.join(__dirname, '/dist'), filename: '[name].js' },
  externals: {
    '@blazor': "window['Blazor']",
    'bootstrap.v3.datetimepicker': "''",
    'jquery': "window['$']"
  }
};
