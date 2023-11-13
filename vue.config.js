module.exports = {
  lintOnSave: false, //关闭eslint
  publicPath: './',
  devServer: {
    disableHostCheck: true
  },
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