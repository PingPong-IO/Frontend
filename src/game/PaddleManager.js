import React, { useEffect, useRef, useState } from 'react';
import { getStompSocket } from '../api/StompSocket';

const PaddleManager = ({ open, gameRoomId }) => {
  const [keyPressed, setKeyPressed] = useState(0);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = getStompSocket();
    return () => {
    };
  }, []);

  useEffect(() => {
    console.log('Paddle Move page Event!!!!!!');
    const movePaddle = (newKeyPressed) => {
		socket.current.send(`/stomp/paddle_move/${gameRoomId}`, {}, JSON.stringify({
			gameRoomId,
			paddleStatus: newKeyPressed,
		  }));
    };
    if (!open) {
      const handleKeyMove = async (event) => {
      console.log('찍히긴 함1');
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          const newKeyPressed = event.key === 'ArrowUp' ? 1 : 2;
          if (keyPressed !== newKeyPressed) {
            setKeyPressed(newKeyPressed);
            movePaddle(newKeyPressed);
          }
        }
      };
      const handleKeyStopper = (event) => {
      console.log('찍히긴 함2');
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          setKeyPressed(0);
          movePaddle(0);
        }
      };
      window.addEventListener('keydown', handleKeyMove); //키가 눌릴 때 keydown이 발생하고 그거에 따라 윗 방향인지 아래 방향인지 감지
      window.addEventListener('keyup', handleKeyStopper); // 키가 떼지는 시점에 키 움직임을 0로 초기화 하는 함수
      return () => {
        window.removeEventListener('keydown', handleKeyMove);
        window.removeEventListener('keyup', handleKeyStopper);
      };
    }
  }, [open, keyPressed]);

  return null;
};

export default PaddleManager;
