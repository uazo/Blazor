const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@blazor': path.join(__dirname, '../Microsoft.AspNetCore.Blazor.Browser.JS/package/types/index.d.ts'),
      '@gritterts': path.join(__dirname, './content/types/gritterdefs.d.ts')
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
  },
  entry: { 'blazor.forms': './Content/Boot.ts' },
  output: { path: path.join(__dirname, '/dist'), filename: '[name].js' },
  externals: {
    '@blazor': "window['Blazor']",
    '@gritterts': "''"
  }
};
