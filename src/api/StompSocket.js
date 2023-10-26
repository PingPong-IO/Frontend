// StompSocket.js

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompSocket = null;

export const initializeSocket = (username) => {
  if (!stompSocket) {
    const socketJs = new SockJS('http://localhost:8081/stomp/test');
    stompSocket = Stomp.over(socketJs);
    stompSocket.connect({username}, () => {
      console.log('STOMP Connected!');
    });
  }
};

export const getStompSocket = () => {
  return stompSocket;
};
