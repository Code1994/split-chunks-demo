const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    entry: path.resolve(__dirname, '../src/entry.js')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.json']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ],
  optimization: {
    splitChunks: {
      // ① 分离第三方包
      // cacheGroups: {
      //   // 默认分离异步chunk中的node_module代码 这里改成同步
      //   libs: {
      //     test: /[\\/]node_modules[\\/]/,
      //     chunks: 'initial',
      //     priority: 10
      //   },
      //   // 分离下lodash
      //   lodash: {
      //     test: /[\\/]node_modules[\\/]lodash[\\/]/,
      //     chunks: 'initial',
      //     priority: 20
      //   }
      // }

      // ②分离不同入口文件间的公共代码
      // cacheGroups: {
      //   common: {
      //     minChunks: 2,
      //     chunks: 'initial',
      //     priority: 20
      //   }
      // }

      // ③分离同入口文件的公共代码
      // cacheGroups: {
      //   common: {
      //     minChunks: 1,
      //     chunks: 'initial',
      //     priority: 20
      //   }
      // }

      // ④maxAsyncRequests
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        // 当jquery和vue都加上maxAsyncRequests为1时 会发现jquery和vue会被打进同一个包内
        jquery: {
          test: /[\\/]node_modules[\\/]jquery[\\/]/,
          maxAsyncRequests: 1,
          priority: 20
        },
        vue: {
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          maxAsyncRequests: 1,
          priority: 20
        }
      }
    },
    // webpack有runtime的概念 会在每次编译完成后 在chunk中生成一堆加载逻辑代码 为了更有效的利用浏览器缓存 可以将这部分也抽离出来
    // 用来抽离每个chunk中的webpack加载代码 单页面应用可设置为single或object.name 多页面应用设置为multiple
    // runtimeChunk: 'multiple'
  }
}
