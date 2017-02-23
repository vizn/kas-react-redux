var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/app3.0');
var BUILD_PATH = path.resolve(ROOT_PATH, 'src/build');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx'),
    //添加要打包在vendors里面的库
    vendors: ['jquery']

  },
  output: {
    path: BUILD_PATH,
    filename: '/bundle.js'
  },
  //enable dev source map
  // devtool: 'eval-source-map',
  devtool: 'false',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  //babel重要的loader在这里
  module: {
    loaders: [
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
      }
    ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: '记账本',
      template: 'src/index.html'
    }),
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production'),
      },
    }),
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', '/vendors.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}
