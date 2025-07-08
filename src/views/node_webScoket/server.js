const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const port = 3001;

//创建WebSocketconst服务
wss = new WebSocket.Server({ port }, () => {
  console.log('服务开启');
});

// 建立连接
wss.on('connection', connectHandle)

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
  console.log('message =======>  ', JSON.parse(data));
}


server.listen(port, () => {
  console.log(`WebSocket服务器运行在 ${port} 端口`);
});