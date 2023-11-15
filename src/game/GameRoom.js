import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameRender from './GameRender';
import { getStompSocket } from '../api/StompSocket';
import GameFinishModal from './GameFinishModal';
import OpponentExitModal from './OpponentExitModal';

const initialCanvasSize = {
  width: 600,
  height: 400,
};

const GameRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { gameRoomId } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [OpponentExitModalVisible, setOpponentExitModalVisible] =
    useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [canvasSize, setCanvasSize] = useState(initialCanvasSize);
  const [innerSize, setInnerSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  });
  const canvasRef = useRef(null);
  const socket = useRef(null);
  const [keyPressed, setKeyPressed] = useState(0);

  useEffect(() => {
    socket.current = getStompSocket();
    subscribeToPositionUpdate();
    subscribeToFinishGame();
    subscribeToExitGame();
    subscribeRestartGame();
    return () => {
      console.log('page unmounted');
    };
  }, []);

  const subscribeToPositionUpdate = () => {
    console.log('subscribeToPositionUpdate');
    const subscription = socket.current.subscribe(
      `/topic/position_update/${gameRoomId}`,
      (response) => {
        console.log(`canvas height: ${canvasRef.current.height}`);
        const message = JSON.parse(response.body);
        GameRender(canvasRef, message);
      },
    );
  };

  const subscribeToFinishGame = () => {
    console.log('subscribeToFinishGame');
    const subscription = socket.current.subscribe(
      `/topic/finish_game/${gameRoomId}`,
      (response) => {
        console.log('finish game');
        setIsModalVisible(true);
        setGameFinished(true);
      },
    );
  };
  const subscribeToExitGame = () => {
    console.log('subscribeToExitGame');
    const subscription = socket.current.subscribe(
      `/topic/exit_game/${gameRoomId}`,
      (response) => {
        console.log('exit game');
        setIsModalVisible(false);
        setOpponentExitModalVisible(true);
      },
    );
  };

  const subscribeRestartGame = () => {
    console.log('subscribeRestartGame');
    const subscription = socket.current.subscribe(
      `/topic/restart_game/${gameRoomId}`,
      (response) => {
        console.log('restart game');
        setIsModalVisible(false);
        setOpponentExitModalVisible(false);
        setGameFinished(false);
      },
    );
  };

  const handleRestart = () => {
    //B 으로 재시작 이벤트 알림 보내기
    socket.current.send(
      `/stomp/game_restart`,
      {},
      JSON.stringify({ gameRoomId }),
    );
  };

  const navigateToHome = () => {
    navigate(`/wstest/${localStorage.getItem('nickname')}`);
  };

  const handleExit = () => {
    setIsModalVisible(false);
    socket.current.send(
      `/stomp/game_room_exit`,
      {},
      JSON.stringify({ gameRoomId }),
    );
    navigateToHome();
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

  //Paddle Event
  useEffect(() => {
    console.log('Paddle Move page Event!!!!!!');
    const movePaddle = (newKeyPressed) => {
      socket.current.send(
        `/stomp/paddle_move`,
        // `/stomp/paddle_move/${gameRoomId}`,
        {},
        JSON.stringify({
          gameRoomId,
          paddleStatus: newKeyPressed,
        }),
      );
    };
    const handleKeyMove = async (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const newKeyPressed = event.key === 'ArrowUp' ? 1 : 2;
        newKeyPressed === 1 ? console.log('ArrowUp') : console.log('ArrowDown');
        if (keyPressed !== newKeyPressed && gameFinished) {
          setKeyPressed(newKeyPressed);
          movePaddle(newKeyPressed);
        }
      }
    };
    const handleKeyStopper = (event) => {
      if (
        (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
        gameFinished
      ) {
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
  }, [keyPressed]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <div
        style={{
          position: 'absolute', // 절대 위치 설정
          top: '50%', // 상단 여백 50%
          left: '50%', // 왼쪽 여백 50%
          transform: 'translate(-50%, -50%)', // 가운데 정렬
        }}
      >
        <GameFinishModal
          isVisible={isModalVisible}
          onRestart={handleRestart}
          onExit={handleExit}
        />
        <OpponentExitModal
          isVisible={OpponentExitModalVisible}
          goHome={navigateToHome}
        />
      </div>
      {/* <PaddleManager open={true} gameRoomId={gameRoomId} /> */}
    </div>
  );
};

export default GameRoom;
