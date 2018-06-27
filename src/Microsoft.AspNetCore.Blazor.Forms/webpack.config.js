const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@blazor': path.join(__dirname, '../Microsoft.AspNetCore.Blazor.Browser.JS/package/types/index.d.ts'),
      '@gritterts': path.join(__dirname, './content/types/gritterdefs.d.ts'),
      'gritter': path.join(__dirname, './node_modules/gritter/js/jquery.gritter.js')
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
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
  },
  entry: { 'blazor.forms': './Content/Boot.ts' },
  output: { path: path.join(__dirname, '/dist'), filename: '[name].js' },
  externals: {
    '@blazor': "window['Blazor']",
    '@gritterts': "''",
    'bootstrap.v3.datetimepicker': "''",
    'jquery': "window['$']"
  }
};
