import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import { initializeSocket, getStompSocket } from './api/StompSocket';
import './css/Login.css';

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border: none;
  color: #0ff;
  background-color: #000;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: #0ff;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0ff;
  background-color: #000;
`;

const Doughnut = styled.svg`
  transform: rotate(-90deg);
`;

const DoughnutTrack = styled.circle`
  stroke: #313131;
  fill: transparent;
`;

const DoughnutIndicator = styled.circle`
  fill: transparent;
  stroke: #0ff;
  stroke-dasharray: 314;
  stroke-dashoffset: ${(props) => props.dashoffset};
`;

const StompComponent = () => {
  const [modeSelectModalOpen, setModeSelectModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
//  const [roomListModalOpen, setRoomListModalOpen] = useState(false);
  const { nickname } = useParams();
  const navigate = useNavigate();
  const socket = useRef(null);

  useEffect(() => {
    console.log('page mounted');
    initializeSocket(nickname);
    socket.current = getStompSocket();
    if (!socket.current) {
      console.log('socket is null');
      socket.connect({}, () => {
        console.log('STOMP Connected!');
      });
    }
    return () => {
      // if (socket.current && socket.current.connected) {
      // socket.current.disconnect();
      //   console.log('STOMP Disconnected!');
      // }
      console.log('page unmounted');
    };
  }, []);

  const handleOneToOne = () => {
    if (socket.current) {
      if (isSubscribed) {
        setIsSubscribed(false);
        socket.current.send('/stomp/cancelMatching');
        socket.current.unsubscribe(`/topic/matching-success`);
      } else {
        socket.current.send('/stomp/matchingJoin');
        setIsSubscribed(true);
        const subscription = socket.current.subscribe(
          `/topic/matching-success`,
          (response) => {
            const message = JSON.parse(response.body);
            const gameRoomId = message.gameRoomId;
            console.log('Received game room ID:', gameRoomId);
            navigate(`/game-room/${gameRoomId}`, { state: { gameRoomId } });
          },
        );
        const payload = {
          mode: 'NORMAL',
          type: 'ONE_ON_ONE',
        };
        socket.current.send('/stomp/matchingJoin', {}, JSON.stringify(payload));
        return () => {
          if (subscription) {
            subscription.unsubscribe();
          }
        };
      }
    }
  };

  const handleSoloPlay = () => {
    if (socket.current) {
      const subscription = socket.current.subscribe(
        `/topic/matching-success`,
        (response) => {
          const message = JSON.parse(response.body);
          const gameRoomId = message.gameRoomId;
          console.log('solo play lollol~');
          navigate(`/single/${gameRoomId}`, { state: { gameRoomId } });
        },
      );
      const payload = {
        mode: 'SOLO',
        type: 'SOLO',
      };
      socket.current.send('/stomp/matchingJoin', {}, JSON.stringify(payload));
    }
  };

  useEffect(() => {
    let interval;
    if (progressModalOpen) {
      interval = setInterval(() => {
        setMatchingProgress((prev) => (prev + 10) % 110);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [progressModalOpen]);

  const handleModeSelection = (mode) => {
    if (socket.current) {
      socket.current.send(
        mode === 'normal' ? 'normal_matching' : 'speed_matching',
      );
      setModeSelectModalOpen(false);
      setProgressModalOpen(true);
    }
  };

  const handleCancelMatching = () => {
    if (socket.current) socket.current.send('cancel_matching');
    setMatchingProgress(0);
    setProgressModalOpen(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>PONG.IO</h1>
      </header>
      <div className="top-bar">
        <button className="top-button">Home</button>
        <button className="user-info-btn">
          <span className="user-identifier">GUEST-80060E8</span>
          <span className="user-status">ANONYMOUS</span>
          <div className="user-avatar"></div>
        </button>
      </div>
      <div className="content">
        <div className="menu">
          <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <Button onClick={() => setModeSelectModalOpen(true)}>
              Quick Match
            </Button>
            <Button onClick={handleSoloPlay}>Solo Play</Button>
            <Button onClick={handleOneToOne}>
              {isSubscribed ? 'Cancel Matching' : '1 : 1'}
            </Button>
            <Button onClick={() => navigate('/rooms')}> Room List </Button>
          </div>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modeSelectModalOpen}
        onRequestClose={() => setModeSelectModalOpen(false)}
        contentLabel="Mode Select Modal"
        style={{
          content: {
            width: '300px',
            height: '200px',
            background: '#000',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalContent>
          <h2>Select Mode</h2>
          <Button onClick={() => handleModeSelection('normal')}>Normal</Button>
          <Button onClick={() => handleModeSelection('fast')}>Fast</Button>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={progressModalOpen}
        onRequestClose={() => setProgressModalOpen(false)}
        contentLabel="Progress Modal"
        style={{
          content: {
            width: '300px',
            height: '200px',
            background: '#000',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <ModalContent>
          <h2>Matching Progress</h2>
          <Doughnut viewBox="0 0 50 50">
            <DoughnutTrack cx="50" cy="50" r="50" strokeWidth="2" />
            <DoughnutIndicator
              cx="50"
              cy="50"
              r="50"
              strokeWidth="2"
              dashoffset={314 - (314 * matchingProgress) / 100}
            />
          </Doughnut>
          <p>{matchingProgress}%</p>
          <Button onClick={handleCancelMatching}>Cancel Matching</Button>
        </ModalContent>
      </Modal>
      <footer className="footer">
        WELCOME
      </footer>
    </div>
  );
};

export default StompComponent;
