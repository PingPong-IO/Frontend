import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PassInput = () => {
  const { username } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

	const apiUrl = 'http://localhost:8080/api/users/login';
    const requestData = {
      nickname: username,
      password: password,
    };

    axios
      .post(apiUrl, requestData)
      .then((response) => {
		navigate('/wstest');
        console.log('Login Successful:', response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
			alert('Invalid password. Please try again.');
			setPassword('');
		  } else {
			// 서버에서의 오류 처리
			console.error('Login Failed:', error.response.data.error);
		  }
		});
  };

  return (
    <div>
      <h1>Password Input Page</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PassInput;
