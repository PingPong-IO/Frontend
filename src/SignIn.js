import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SignIn = () => {
  const { username } = useParams();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일이 입력되지 않은 경우 처리
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    // 여기에서 password와 email 값을 사용하여 로그인 요청을 보낼 수 있습니다.
    axios.post('http://localhost:8080/api/users/', {
      nickname: username,
      password: password,
      email: email, // 이메일 값 전달
    })
    .then((response) => {
      navigate('/wstest');
      console.log('Login Successful:', response.data);
    })
    .catch((error) => {
      console.error('Login Failed:', error.response.data.error);
    });
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <p>Username: {username}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
			placeholder="(선택사항)비밀번호 분실시 사용됩니다."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
