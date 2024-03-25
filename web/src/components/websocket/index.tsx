/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Input } from 'antd';

export enum MsgType {
  msg = 'msg',
  heartBeat = 'heartBeat',
  open = 'open',
};

function getParams({ msg, code }: { msg: string; code: MsgType }): string {
  return JSON.stringify({
    code,
    msg,
    timestamp: new Date(),
  });
};

const TplWebSocket =  ({ randomNumber }: { randomNumber: number }) => {
  const [str, setStr] = useState('');
  const name = 'ts-tpl-app';
  const wsUrl = `ws://127.0.0.1:3001/ws/?name=${name}`;
  const wsRef = useRef<WebSocket>(null);
  const wsState = useRef<boolean>(false);
  function initWS() {
    if (wsRef.current) {
      wsRef.current.onopen = function(e) {
        // 连接上时回调
        console.log('连接成功');
        wsState.current = true;
        if (wsRef.current) {
          wsRef.current.send(
            getParams({ msg: 'first connect', code: MsgType.open })
          );
        }
        startHeartBeat(3000, 2000);
      };
      wsRef.current.onclose = function() {
        //断开连接时回调
        console.log('连接关闭');
        // setWSState(false);
      };
      wsRef.current.onmessage = function(e) {
        // 收到服务端消息
        let data = { msg: '--' };
        wsState.current = true
        try {
          JSON.parse(e.data);
          console.log('收到消息' + e, data.msg);
        } catch(err) {
          // @ts-ignore
          window.xx= e;
          console.log('收到消息解析失败：', e, e.data);
        }
      };
      wsRef.current.onerror = function (e) {
        // 连接出错
        console.log('连接出错')
        wsState.current = false;
    }
    }
  };

  function reconnectWebSocket () {
    if(!wsRef.current) {//第一次执行，初始化
        connectWebSocket()
    } else {
      // wsRef.current.close();
      connectWebSocket();
    }
  }

  // 延时等待服务端响应，通过 webSocketState 判断是否连接成功
  function waitingServer(time: number, timeout: number) {
    // 在线状态
    wsState.current = false;
    setTimeout(() => {
      console.log(time, timeout);
      console.log(wsState, '--wsState');
      console.log(new Date(), '--心跳检测结束');
        if(wsState) {
            startHeartBeat(time, timeout);
            return
        }
        console.log('心跳无响应，已断线')
        wsRef.current?.close();
        //重连操作
        reconnectWebSocket();
    }, timeout)
  };

  // 心跳初始函数 time：心跳时间间隔 timeout 超时间隔
  function startHeartBeat(time: number, timeout: number) {
    console.log(new Date(), '--开始心跳检测');
    setTimeout(() => {
      if (!wsRef.current) return;
      wsRef.current.send(
        getParams({
          code: MsgType.heartBeat,
          msg: `心跳检测 ${new Date()}`,
        })
      );
      waitingServer(time, timeout);
    }, time);
  };

  function connectWebSocket() {
    if (!wsRef.current) {
      // @ts-ignore
      wsRef.current = new WebSocket(wsUrl);
      initWS();
    } else {
      wsRef.current.close();
      // @ts-ignore
      wsRef.current = new WebSocket(wsUrl);
      initWS();
    };
  };
  useEffect(() => {
    // connectWebSocket();
    // return () => {
    //   if (wsRef.current) {
    //     wsRef.current.close();
    //   }
    // };
  }, []);
  return (
    <div style={{ padding: 20, border: '1px solid #f00' }}>
    <Space>
      <Button onClick={connectWebSocket}>连接 ws</Button>
      <Button onClick={() => {
        wsRef.current?.close();
        // @ts-ignore
        wsRef.current = null;
      }}>关闭 ws</Button>

      <Button onClick={() => {
        // wsRef.current = new WebSocket
        initWS();
      }}>重新连接 ws</Button>

      <Input onChange={(e) => { setStr(e.target.value); }} />
      <Button onClick={() => {
        wsRef.current?.send(
          getParams({ msg: `Hello，${str}`, code: MsgType.msg })
        );
      }}>推送信息</Button>
      <Button onClick={() => {
        wsRef.current?.send(
          getParams({ msg: 'HeartBeat', code: MsgType.heartBeat })
        );
      }}>心跳检测</Button>
      {randomNumber}
    </Space>
    </div>
  );
};

export default TplWebSocket;
