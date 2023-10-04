import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import SockJS from 'sockjs-client';

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
  stroke-dashoffset: ${props => props.dashoffset};
`;


const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [modeSelectModalOpen, setModeSelectModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // WebSocket 객체 생성 및 연결
    const newSocket = new SockJS('http://localhost:8080/websocket/game');
    setSocket(newSocket);
    newSocket.onopen = () => console.log('WebSocket Connected!');
    newSocket.onmessage = (event) => {
      if (event.data === 'normalModeMatchingSuccess') {
        setProgressModalOpen(false);
      }
    };
    return () => newSocket.close();
  }, []);

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
    <div style={{color: '#0ff', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1>Main Page</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <Button onClick={() => setModeSelectModalOpen(true)}>Quick Match</Button>
        <Button onClick={handleSoloPlay}>Solo Play</Button>
      </div>
      <Modal 
        ariaHideApp={false}
        isOpen={modeSelectModalOpen} 
        onRequestClose={() => setModeSelectModalOpen(false)} 
        contentLabel="Mode Select Modal"
        style={{content: { width: '300px', height: '200px', background: '#000', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}}
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
        style={{content: { width: '300px', height: '200px', background: '#000', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}}
      >
        <ModalContent>
          <h2>Matching Progress</h2>
          <Doughnut viewBox="0 0 50 50">
            <DoughnutTrack cx="50" cy="50" r="50" strokeWidth="2"/>
            <DoughnutIndicator cx="50" cy="50" r="50" strokeWidth="2" dashoffset={314 - (314 * matchingProgress / 100)} />
          </Doughnut>
          <p>{matchingProgress}%</p>
          <Button onClick={handleCancelMatching}>Cancel Matching</Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WebSocketComponent;
