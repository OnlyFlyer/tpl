/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

const RTC =  ({ randomNumber }: { randomNumber: number }) => {
  const startStreaming = async () => {
    const videoElement = document.getElementById('localVideo');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 680, height: 460 } });
      if (videoElement) {
        // @ts-ignore
        videoElement.srcObject = stream;
      }
      startPeerConnection(stream);
  } catch (error) {
      console.error('Error accessing media devices: ', error);
  }
  };
  async function startPeerConnection(stream: MediaStream) {
      const configuration: RTCConfiguration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnection.addEventListener('connectionstatechange', (e) => {
        console.log(e, '--29 connectionstatechange');
      })

      // 添加本地音视频流到 PeerConnection
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

      // 创建并发送 Offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      sendMessage({ type: 'offer', sdp: peerConnection.localDescription });
  }

  function sendMessage(message: any) {
      // 在这里发送信令消息到信令服务器
      console.log('Sending message to signaling server: ', message);
  }
  useEffect(() => {
    startStreaming();
  }, [startStreaming]);

  return (
    <div>
      <h1>WebRTC Audio/Video Sender</h1>
      <video id="localVideo" muted autoPlay></video>
      {randomNumber}
    </div>
  );
};

export default RTC;
