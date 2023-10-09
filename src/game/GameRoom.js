import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GameRender from './GameRender';
import { getStompSocket } from '../api/StompSocket';

const initialCanvasSize = {
	width: 600,
	height: 400
};

const GameRoom = () => {
  const location = useLocation();
  const { state } = location;
  const { gameRoomId } = state;
  const [canvasSize, setCanvasSize] = useState(initialCanvasSize);
  const [innerSize, setInnerSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  });
  const canvasRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = getStompSocket();
	subscribeToPositionUpdate();
	subscribeToFinishGame();
    return () => {
      console.log('page unmounted');
    };
  }, []);

  const subscribeToPositionUpdate = () => {
	console.log('subscribeToPositionUpdate');
    const subscription = socket.current.subscribe(
      `/topic/position_update/${gameRoomId}`,
      (response) => {
        const message = JSON.parse(response.body);
		GameRender(canvasRef.current, message);
      },
    );
  };

  const subscribeToFinishGame = () => {
	console.log('subscribeToFinishGame');
    const subscription = socket.current.subscribe(
      `/topic/finish_game/${gameRoomId}`,
      (response) => {
        console.log('finish game');
      },
    );
  };

  const reRenderCanvasSize = (width, height) => {
    const what = width * 2 > height * 3 ? true : false;
    if (what) setCanvasSize({ width: (height * 3) / 2, height: height });
    else setCanvasSize({ width: width, height: (width * 2) / 3 });
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerSize({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
      });
    };
    window.addEventListener('resize', handleResize);
    reRenderCanvasSize(innerSize.width, innerSize.height);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerSize.width, innerSize.height]);
  
  return (
	<>
		<canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
	</>
  )
};

export default GameRoom;
