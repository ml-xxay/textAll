var Mock = require('mockjs')
import Mock from 'mockjs'
var fs = require('fs')
var path = require('path')
var data = Mock.mock({
  "banner|4": [{
    "id|+1": [1, 2, 3, 4],
    "img|+1": [
      "https://s18.mogucdn.com/mlcdn/c45406/190509_55i5fi9lgkbdajd68j8gaji32jkjh_750x300.png_999x999.v1c0.81.webp",
      "https://s2.mogucdn.com/mlcdn/c45406/190225_533fe4d24h6ckfj918j78302dbc98_750x300.jpg_999x999.v1c0.81.webp",
      "https://s2.mogucdn.com/mlcdn/c45406/190509_5b77ajb40141cdf18h0gd2g22k3lg_750x300.jpg_999x999.v1c0.81.webp",
      "https://s11.mogucdn.com/mlcdn/c45406/190411_7i3ic1k8k7hl4hgak2982i3bl18kl_750x300.jpg_999x999.v1c0.81.webp"
    ]
  }]
})
// 输出结果
var result = JSON.stringify(data["banner"], null, 4)

//同过对文件的操作生成数据文件到指定的目录
fs.writeFile(path.join(__dirname, '../public/banner.json'), result, function (error) {
  if (error) throw error
  console.log('数据生成成功')
})
Mock.mock('/getInfo', { // 拦截 路由为 /getInfo 的请求。
  data: {
    name: "孟磊", // 生成数据中文名字
    id: 3, // 生成随机 ID
    code: 200
  }
})