const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  var plugins = [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]

  if (env && env.analyzer) {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'analysis/bundleReport.html'),
      generateStatsFile: true,
      statsFilename: path.resolve(__dirname, 'analysis/bundleStats.json')
    }));
  }

  return {
    entry: {
      main: './src/index.js',
      vendor: ['react', 'react-dom']
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ]
    },
    plugins: plugins,
    devServer: {
      historyApiFallback: true
    }
  };
};
