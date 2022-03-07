const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
      front: [
          'webpack-hot-middleware/client',
          path.resolve(__dirname, './src/index')
      ],
  },
  output: {
      path: path.resolve(__dirname, './static/dist'),
      filename: "[name].js",
      publicPath: '/dist/'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },{
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    sourceMap: true,
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            }
        ],
    },{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },{
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
}