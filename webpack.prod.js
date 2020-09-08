const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const smp = new SpeedMeasurePlugin()


const NODE_ENV = process.env.NODE_ENV
console.log("--------"+NODE_ENV+"-----------")

WebpackConfig = {
  mode: NODE_ENV,
  target: 'web',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/' //output, devServer的pubicPath 必须一样
  },
  resolve: {
    extensions: ['*','.js','.json','.vue','.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  stats:{
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    warnings: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['cache-loader', 'vue-loader']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles/variables'),
        use: [
          { loader: MiniCssExtractPlugin.loader},
          'cache-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/styles/variables'),
        use: [
          { loader: MiniCssExtractPlugin.loader},
          'cache-loader',
          "css-loader",
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader},
          'cache-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: 'img/[name].[hash:10].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/icons'),
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new ProgressBarPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons'
        },
        'vendor-A': {
          test: /vue|vuex|vue-router|axios|echarts|element-ui|normalize.css/,
          chunks: "initial",
          name: "vendor-A",
          enforce: true
        }
      }
    }
  }
}

module.exports = smp.wrap(WebpackConfig)
