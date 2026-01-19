const HtmlWebpackPlugin = require('html-webpack-plugin')
const tailwindcss = require('tailwindcss')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // …your existing config…
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',      // generate a local HTML file
      reportFilename: 'report.html',
      openAnalyzer: true           // automatically launch in browser
    })
  ]
}


module.exports = (env) => ({
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(webp|jpe?g|svg|png)$/i,
        loader: 'file-loader'
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
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
	new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      openAnalyzer: true
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3001
  }
})
