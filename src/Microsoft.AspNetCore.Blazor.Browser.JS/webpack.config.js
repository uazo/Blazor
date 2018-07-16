const path = require('path');
const webpack = require('webpack');

var cOptions = {}
var libraryName = "blazor";
var outputFolder = "dist";

module.exports = function (env, args) {
  var plugins = [];
  if (env && env.declaration === "yes") {
    cOptions = {
      "declaration": true,
      "declarationDir": "./types"
    };
    outputFolder = "package";
    plugins.push(new DtsBundlePlugin());

    console.log("Creating .d.ts");
  }

  return {
    resolve: { extensions: ['.ts', '.js'] },
    devtool: args.mode === 'development' ? 'inline-source-map' : 'none',
    module: {
      rules: [{
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: cOptions
        }
      }]
    },
    entry: {
        'blazor.webassembly': './src/Boot.WebAssembly.ts',
        'blazor.server': './src/Boot.Server.ts',
    },
    output: {
      path: path.join(__dirname, '/' + outputFolder), filename: '[name].js',
      library: libraryName,
      //libraryTarget: 'umd',
      //umdNamedDefine: true
    },
    plugins: plugins
  }
};


function DtsBundlePlugin() { }

DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function () {
    var dts = require('dts-bundle');

    dts.bundle({
      name: libraryName,
      main: outputFolder + '/types/Microsoft.AspNetCore.Blazor.Browser.JS/src/BlazorJSLibrary.d.ts',
      out: path.join(__dirname, './package/index.d.ts'),
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};
