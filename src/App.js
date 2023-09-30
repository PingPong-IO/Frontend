import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import PassInput from './PassInput';
import WebSocketComponent from './Ws';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password_input" element={<PassInput />} />
          <Route path="/wstest" element={<WebSocketComponent />} />

          {/* 다른 페이지 라우트를 추가하세요. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
