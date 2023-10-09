// StompSocket.js

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompSocket = null;

export const initializeSocket = () => {
  if (!stompSocket) {
    const socketJs = new SockJS('http://localhost:8080/stomp/test');
    stompSocket = Stomp.over(socketJs);
    stompSocket.connect({}, () => {
      console.log('STOMP Connected!');
    });
  }
};

export const getStompSocket = () => {
  return stompSocket;
};
