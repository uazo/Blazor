const path = require('path');
const webpack = require('webpack');

var cOptions = {}
var libraryName = "blazor";
var outputFolder = "dist";

module.exports = function (env) {

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
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: cOptions
        }
      }]
    },
    entry: { libraryName: './src/Boot.ts' },
    output: {
      path: path.join(__dirname, '/' + outputFolder), filename: libraryName + '.js',
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
      main: outputFolder + '/types/module.d.ts',
      out: 'index.d.ts',
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};
