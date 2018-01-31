const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    'index': './src/index.js',
    'wfpui': './scss/wfpui.scss',
    'wfpui+grid': './scss/wfpui+grid.scss',
    'bootstrap-theme': './scss/bootstrap-theme.scss'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules/', '/scss/'],
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['./node_modules/']
              }}
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/dist'
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './assets/',
      to: '[path][name].[ext]'
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i
    }),
    new ExtractTextPlugin('css/[name].css')
  ],

  resolve: {
    extensions: ['.js', '.sass'],
    modules: [path.join(__dirname, './src'), 'node_modules']
  }
};