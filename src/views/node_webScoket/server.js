const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const port = 3002;

//创建WebSocketconst服务
wss = new WebSocket.Server({ port }, () => {
  console.log('服务开启');
});



const connectHandle = (ws) => {
  console.log('客户端连接了');

  //监听客户端出错
  ws.on('error', errorHandle);
  // 监听客户端关闭
  ws.on('close', closeHandle);
  // 接受用户端发送的消息
  ws.on('message', messageHandle);
}

const errorHandle = (error) => {
  console.log('errorHandle======>客户端出错了', error);
}
const closeHandle = (e) => {
  console.log('closeHandle=======>客户端断开了 ', e);
}
const messageHandle = (data) => {
  console.log('message =======>  ', data);
}


// 建立连接
wss.on('connection', connectHandle)



server.listen(8888, () => {
  console.log(`WebSocket服务器运行在 ${8888} 端口`);
});

// 捕获启动错误（如端口被占用）
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ 端口 ${port} 已被占用，请更换端口`);
  } else {
    console.error('服务器发生错误:', err);
  }
});