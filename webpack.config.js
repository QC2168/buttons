const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
    index: './src/pages/index/index.js', // index页面
    hello: './src/pages/hello/hello.js', // hello页面
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]/[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    host: '0.0.0.0',
    useLocalIp: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 8088,
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: './src/pages/index/index.html',
      chunks: ['index', 'main'],
    }),
    new HtmlWebpackPlugin({
      title: 'hello',
      filename: 'hello.html',
      template: './src/pages/hello/hello.html',
      chunks: ['hello', 'main'],
    }),
  ],
};
