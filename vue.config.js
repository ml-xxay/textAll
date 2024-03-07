// const path = require('path');
module.exports = {
  // entry: './src/components/modifypasssd.vue', // 指定你的组件入口文件路径
  // output: {
  //   filename: 'modifypasssd.vue', // 输出的打包文件名
  //   path: path.resolve(__dirname, 'dist'), // 输出目录
  // },
  lintOnSave: false, //关闭eslint
  publicPath: './',
  devServer: {
    disableHostCheck: true
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader', // 假设你需要使用Babel来转译ES6+代码
  //       },
  //     },
  //     {
  //       test: /\.vue$/,
  //       use: ['vue-loader'], // 如果是Vue单文件组件，则需要Vue Loader
  //     },
  //     // 其他loader配置，如CSS、图片等
  //   ],
  // },
  // configureWebpack  表示你准备配置webpack
  configureWebpack: {
    resolve: {
      // alias 别名的意思
      alias: {
        // '@': 'src'  @对应的就是src  默认的
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
          // 脚手架4(cli4版本配置)
          //   chainWebpack:(config)=>{
          //     config.resolve.alias
          //         //set第一个参数：设置的别名，第二个参数：设置的路径
          //         .set('@',resolve('./src'))
          //         .set('assets',resolve('.src/assets'))
          //         .set('components',resolve('./src/components'))
          //         .set('views',resolve('src/views'))
          // }

      }
    }
  }
}