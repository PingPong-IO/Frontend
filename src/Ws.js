import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
//   const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // WebSocket 객체 생성 및 연결
    const newSocket = new WebSocket('ws://localhost:8080/websocket/game');
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket 연결 성공!!');
    };

    newSocket.onmessage = (event) => {
      // 서버로부터 메시지를 받을 때의 로직을 여기에 작성합니다.
      console.log('받은 메시지:', event.data);
    };
    // 컴포넌트가 언마운트 시 연결 해제
    return () => {
      newSocket.close();
    };
  }, []);

  const handleMatching = () => {
	if (socket) {
	  socket.send('matching');
	}
  };

//   const sendMessage = () => {
// 	if (socket && inputMessage) {
// 	  socket.send(inputMessage); // 입력한 메시지를 서버로 전송
// 	  setInputMessage(''); // 입력 필드 초기화
// 	}
//   };


  return (
    <div>
      <h1>메인 페이지</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <button onClick={handleMatching} style={{ width: '100%' }}>
          빠른 매칭
        </button>
      </div>
    </div>
  );
};

export default WebSocketComponent;