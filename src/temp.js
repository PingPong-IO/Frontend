import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

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
  const [socket, setSocket] = useState(null);
  const [modeSelectModalOpen, setModeSelectModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState(null); // [TODO] 현재 유저 정보수를 받아오는 envent 추가 필요
  const navigate = useNavigate();

  useEffect(() => {
    // WebSocket 객체 생성 및 연결
    const socketJs = new SockJS('http://localhost:8080/stomp/test');
    const newSocket = Stomp.over(socketJs);
    newSocket.connect({}, () => {
      console.log('STOMP Connected!');
    });
    setSocket(newSocket);
    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
        console.log('STOMP Disconnected!');
      }
      console.log('page unmounted');
    }
  }, []);

  const handleOneToOne = () => {
    if (socket) {
      socket.send('/stomp/matchingJoin');
    }
  }

  useEffect(() => {
    console.log(1);
    if (socket && socket.connected) {
      console.log(2);
      const sessionId = socket.ws._transport.url.split('/')[5];
      console.log(`Session ID: ${sessionId}`);
      const subscription = socket.subscribe(`/user/${sessionId}/topic/matching-success`, (response) => {
        const message = JSON.parse(response.body);
        const gameRoomId = message.gameRoomId;
        console.log('Received game room ID:', gameRoomId);
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [socket]);

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
    if (socket) {
      socket.send(mode === 'normal' ? 'normal_matching' : 'speed_matching');
      setModeSelectModalOpen(false);
      setProgressModalOpen(true);
    }
  };

  const handleCancelMatching = () => {
    if (socket) socket.send('cancel_matching');
    setMatchingProgress(0);
    setProgressModalOpen(false);
  };

  const handleSoloPlay = () => navigate('/single');

  return (
    <div
      style={{
        color: '#0ff',
        backgroundColor: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Main Page</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <Button onClick={() => setModeSelectModalOpen(true)}>
          Quick Match
        </Button>
        <Button onClick={handleSoloPlay}>Solo Play</Button>
        <Button onClick={handleOneToOne}>1 : 1</Button>
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
    </div>
  );
};

export default StompComponent;
