var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

class WebSocketServer extends WebSocket.Server {
  constructor() {
    super(...arguments);
    // 用于存放已连接的客户端
    this.webSocketClient = {};
  };
  set ws(ws) {
    this._ws = ws;
    ws.t = this;
    ws.on('error', this.wsErrorHandler);
    ws.on('close', this.wsCloseHandler);
    ws.on('message', this.wsMsgHandler);
  };
  get ws() {
    return this._ws;
  };
  wsErrorHandler = (e) => {
    // ws 连接失败
    console.info('客户端出错')
    this.t.removeClient(this)
  };
  wsCloseHandler = (e) => {
    // ws 连接关闭
    console.info('客户端已断开')
    this.t.removeClient(this)
  };
  wsMsgHandler = (e) => {
    // ws 信息传送
    console.info('接收客户端消息')
    let data = JSON.parse(e)
    switch(data.ModeCode) {
        case 'message':
            console.log('收到消息' + data.msg)
            this.send(e)
            break;
        case 'heart_beat':
            console.log(`收到${this.name}心跳${data.msg}`)
            this.send(e)
            break;
    }
  };
  addClient = (item) => {
    //设备上线时添加到客户端列表
    console.log(item, '--addClient item');
    if(this.webSocketClient[item['name']]) {
      console.log(item['name'] + '客户端已存在')
      this.webSocketClient[item['name']].close()
    }
    console.log(item['name'] + '客户端已添加')
    this.webSocketClient[item['name']] = item
  };
  removeClient (item) {
    //设备断线时从客户端列表删除
    if(!this.webSocketClient[item['name']]) {
        console.log(item['name'] + '客户端不存在')
        return;
    }
    console.log(item['name'] + '客户端已移除')
    this.webSocketClient[item['name']] = null
  }
};

// const wss = new WebSocketServer({ port: 3002 });

// const wss = new WebSocket.Server({ port: 3002 });

// export enum MsgType {
//   msg = 'msg',
//   heartBeat = 'heartBeat',
//   open = 'open',
// };

// wss.on('connection', function(ws) {
//   ws.on('message', function (e) {
//     // 接收到来自客户端的信令消息
//     console.log('收到客户端的信息: ', JSON.parse(e));
//     console.log('当前连接数: ', wss.clients.size);
//     this.send(e);

//     // 转发信令消息给对端
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(e);
//         // setTimeout(() => {
//         //   client.send(JSON.stringify(e));
//         // }, 5000);
//       }
//     });
//   });
//   ws.on('close', (msg) => {
//     // 接收到来自客户端的信令消息
//     console.log('关闭 接收到来自客户端的信令消息: ', msg);
//   });

//   // ws.onmessage = function(msg) {}
// });

var app = express();

//验证url标准
function checkUrl (url, key) {//判断url是否包含key
  return - ~ url.indexOf(key)
}

// app.on('upgrade', (req, socket, head) => {
//   // 通过 http.server 过滤数据
//   let url = new URL(req.url, `http://${req.headers.host}`);
//   const name = url.searchParams.get('name'); // 获取连接标识
//   if (!checkUrl(url.pathname, pathname)) {
//     // 未按标准;
//     console.log('未按标准，关闭 socket 连接');
//     return;
//   }
//   wss.handleUpgrade(req, socket, head, function(ws) {
//     ws.name = name; // 添加索引，方便客户端列表查询某一个 socket 连接
//     wss.addClient(ws);
//     wss.ws = ws;
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
