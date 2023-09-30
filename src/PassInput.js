import React, { useState } from 'react';
import axios from 'axios';

const PassInput = () => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    const apiUrl = `/api/startGame?username=${username}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // 게임 시작 후 다음 페이지로 이동 (게임 페이지)
        // response.data에서 게임 상태 등을 받아와서 사용할 수 있습니다.
        console.log('Game Started:', response.data);
      })
      .catch((error) => {
        console.error('Failed to start the game:', error);
      });
  };
  return (
    <div>
      <h1>비밀번호를 입력하세요.</h1>
    </div>
  );
};

export default PassInput;
