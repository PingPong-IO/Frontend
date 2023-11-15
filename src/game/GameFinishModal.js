import React, { useState } from 'react';

function GameFinishModal({ isVisible, onRestart, onExit }) {
  const [isRestart, setIsRestart] = useState(false);

  const handleRestart = () => {
    setIsRestart(true);
    onRestart();
  };

  return isVisible ? (
    <div className="modal">
      <div className="modal-content">
        <p>게임이 종료되었습니다.</p>
        {!isRestart && (
          <button onClick={handleRestart}>다시하기</button>
        )}
        {isRestart ? (
          <p>상대를 기다리는 중...</p>
        ) : (
        <button onClick={onExit}>나가기</button>
        )}
      </div>
    </div>
  ) : null;
}

export default GameFinishModal;
