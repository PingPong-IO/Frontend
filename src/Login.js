import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLogin = () => {
	const apiUrl = 'http://localhost:8080/api/users/' + username;
	axios.get(apiUrl)
    .then(() => {
		navigate('/password_input');
    })
    .catch((error) => {
      alert(error, 'Login failed. Please check your credentials.');
    });
  };

  const handleSignIn = () => {
    navigate('/sign_in');
  };

  const handleGuestLogin = () => {
    axios.post('http://localhost:8080/api/users/guest-login')
    .then(() => {
      navigate('/wstest');
    })
    .catch((error) => {
      alert(error, 'Login failed. Please check your credentials.');
    });
  };

  const webSocketTest = () => {
    navigate('/wstest');
  }

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh', // 화면 높이를 최소화하여 화면 정중앙에 배치
    }}
  >
    <h1>아름 Login Page 다운</h1>
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleLogin} style={{ width: '100%' }}>
        Login
      </button>
      <button onClick={handleSignIn} style={{ width: '100%' }}>
        회원가입
      </button>
      <div style={{ marginBottom: '20px' }}></div> {/* 간격 조절 */}
      
      <button onClick={handleGuestLogin} style={{ width: '100%' }}>
        Guest Login
      </button>

      <button onClick={webSocketTest} style={{ width: '100%' }}>
        이거누르면 소켓연결
      </button>
    </div>
  </div>
  );
};

export default Login;
