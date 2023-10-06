// WebSocketComponent.js
import React, { useEffect } from 'react';
import { useSocket } from './SocketContext';

function WebSocketComponent() {
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    if (!socket) {
      // 소켓을 설정하고 연결
      const newSocket = new WebSocket('ws://localhost:8080/websocket/game2');
      setSocket(newSocket);
    }
  }, [socket, setSocket]);

  // 여기에서 소켓을 사용할 수 있음

  return (
    <div>
      {/* WebSocketComponent 내용 */}
    </div>
  );
}

export default WebSocketComponent;
