import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
	// 소켓 객체 생성 및 연결
    const newSocket = io('http://localhost:8080/websocket/game', {
		withCredentials: true,
		// autoConnect: false,
	});
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('WebSocket 연결 성공!');
    });

    // 컴포넌트가 언마운트 시 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* 컴포넌트 렌더링 내용 */}
	  웹소켓 테스트 페이지
    </div>
  );
};

export default WebSocketComponent;
