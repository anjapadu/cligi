const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let plugins;

module.exports = env => {
  if (env.production) {
    plugins = require('./webpack/plugins/plugins.prod');
  } else {
    plugins = require('./webpack/plugins/plugins.dev');
  }
  return {
    entry: ["babel-polyfill", "./src/index.js"],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: (env.production ? {} : {
        'react-dom': '@hot-loader/react-dom'
      })
    },

    output: {
      publicPath: '/',
      filename: env.production ? "[name].[contenthash].bundle.js" : "[name].bundle.js",
      chunkFilename: env.production ? "[name].[contenthash].chunk.js" : "[name].chunk.js"
      //chunkFilename: "chunkhash].js"
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          }]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        /***********************************/
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /\.otf(\?.*)?$/,
          use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
        }
        /***********************************/
      ]
    },
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      // hot: true
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            minChunks: Infinity
          }
        }
      }
    },
    plugins: plugins
  }
};



