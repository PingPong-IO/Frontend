import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true); // 닉네임 중복 여부 상태 추가
  const navigate = useNavigate();

  // 닉네임 중복 체크 요청 함수
  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/users/exists/' + username,
      );
      setIsUsernameAvailable(response.data.exists);
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 닉네임 중복 체크 요청 보내기
    await checkUsernameAvailability();

    // 만약 닉네임이 이미 존재하면 중복 메시지를 표시하고 회원가입 요청을 보내지 않음
    if (isUsernameAvailable) {
      alert('이미 존재하는 닉네임입니다. 다른 닉네임을 사용해주세요.');
      return;
    }

    // 회원가입 데이터 생성
    const userData = {
      nickname: username,
      password: password,
      email: email,
    };

    try {
      // Axios를 사용하여 POST 요청 보내기
      const response = await axios.post(
        'http://localhost:8080/api/users',
        userData,
      );

      // 요청 성공 시 처리
      console.log('회원가입 성공:', response.data);
      navigate('/wstest');
    } catch (error) {
      // 요청 실패 시 처리
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* 닉네임 중복 메시지 표시 */}
        {!isUsernameAvailable && <p>이미 존재하는 닉네임입니다.</p>}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email (Optional)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
