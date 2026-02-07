const HtmlWebpackPlugin = require('html-webpack-plugin')
const tailwindcss = require('tailwindcss')

module.exports = (env) => ({
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [tailwindcss]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 3001,
    host: '0.0.0.0',
    hot: true,
    watchFiles: ['src/**/*'],
    proxy: [
      {
        context: ['/api'],
        target: process.env.API_URL
      }
    ]
  }
})
