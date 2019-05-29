const path = require('path')

// const webpack = require('webpack')

// 导入在内存生成 HTML页面的插件
// 只要是插件，都一定要放到 plugins 节点中去
// 这个插件的两个作用
// 1、自动在内存中根据指定页面生成一个内存中的页面
// 2、自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugins = require('html-webpack-plugin')

// ！！！解决在安装好 vue-loader vue-template-compiler并配置好 处理vue文件的loader后，仍然报错 你需要合适的loader
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 这个配置就是一个 JS 文件 通过 Node 中的模块操作，向外暴露了一个配置对象
module.exports = {

  mode: 'development', //development/production   开发环境/生产环境
  entry: path.join(__dirname, './src/main.js'), //入口，表示 webpack 要打包哪个文件
  output: {
    path: path.join(__dirname, './dist'), //指定打包好的文件，输出到哪个目录去
    filename: 'bundle.js' //这是指定输出的文件名称
  },
  devServer: { //配置 webpack-dev-server 命令参数
    //  --open --port 3000 --contentBase src --hot
    open: true, //webpack-dev-server启动后自动打开浏览器
    port: 3000, //指定端口
    // contentBase: 'src', //指定根目录
    hot: true, //启用热更新
  },
  plugins: [ //配置插件的节点
    // 低版本的 webpack 启动热更新 需要配置
    // new webpack.HotModuleReplacementPlugin()

    new htmlWebpackPlugins({ //在内存中生成 HTML 页面的插件,并且会自动引入打包好的js  bundle.js
      template: path.join(__dirname, './src/index.html'), //指定模板页面，会根据指定的页面去生成内存中的页面
      filename: 'index.html' //指定生成在页面中的页面的名称
    }),
    // ！！！解决在安装好 vue-loader vue-template-compiler并配置好 处理vue文件的loader后，仍然报错 你需要合适的loader
    new VueLoaderPlugin()
  ],
  module: { //这个节点用于配置 所有第三方模块加载器
    rules: [{ //这个第三方模块的 匹配规则
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], //配置处理 css文件的第三方loader规则
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'] //配置处理less文件的第三方loader规则
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'] //配置处理scss文件的第三方loader规则
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: ['url-loader?limit=29534&name=[hash:12]-[name].[ext]'] //配置处理图片路径的loader
        // limit 给定的值是图片大小，单位byte 如果引用的图片大于或等于给定的limit值，则不会被转为base64格式
        // 的字符串，如果图片小于给定的limit值，则会被转为base64的字符串

        // name=[hash:12]-[name].[ext]  表示[name].[ext]表示显示图片原始名称，[hash:12]是获取图片哈希值截取前12位作为文件名
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader' //处理字体文件的loader
      },
      {
        test: /\.js$/,
        use: 'babel-loader', //配置babel来转换高级的ES语法
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'   //配置处理.vue文件的loader
      }
    ]
  },
  resolve: {
    alias: { //修改vue被导入的时候包的路径
      // "vue$": "vue/dist/vue.js"
    }
  }
}

// 1、首先，webpack 发现并没有通过命令的形式给它指定入口和出口
// 2、webpack就会去项目的根目录中查找一个叫做 'webpack.config.js' 的配置文件
// 3、当找到配置文件后，webpack悔去解析这个配置文件，当解析执行完配置文件后，就得到了配置文件中导出的配置对象
// 4、当webpack 拿到配置对象后，就拿到配置对象中指定的入口和出口，然后进行打包构建