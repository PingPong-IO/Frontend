import React from 'react';

function OpponentExitModal({ isVisible, goHome }) {
  return isVisible ? (
    <div className="modal">
      <div className="modal-content">
        <p>상대가 떠났습니다.</p>
        <button onClick={goHome}>확인</button>
      </div>
    </div>
  ) : null;
}

export default OpponentExitModal;
