import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  //   const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // WebSocket 객체 생성 및 연결
    const newSocket = new WebSocket('ws://localhost:8080/websocket/game');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket 연결 성공!');
    };

    newSocket.onmessage = (event) => {
      if (event.data === 'intervalTest') {
        console.log('이벤트가 잘오는군요 ㅎㅎ', event.data);
      }
    };
    return () => {
      newSocket.close();
    };
  }, []);

  const handleMatching = () => {
    if (socket) {
      socket.send('matching');
    }
  };

  const handleSoloPlay = () => {
    console.log('솔로 플레이 시작');
    navigate('/single');
  };

  return (
    <div>
      <h1>메인 페이지</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <button onClick={handleMatching} style={{ width: '100%' }}>
          빠른 매칭
        </button>
        <button onClick={handleSoloPlay} style={{ width: '100%' }}>
          솔로 플레이
        </button>
      </div>
    </div>
  );
};

export default WebSocketComponent;
