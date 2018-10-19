const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

const plugins = [
  new CleanWebpackPlugin(['dest']),
  new Dotenv(),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: './index.html'
  }),
  new ExtractTextPlugin('style.css')
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  }))
}

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dest'
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dest'),
    filename: 'main.js',
  },
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        })
      }
    ]
  },
  plugins: plugins
}
