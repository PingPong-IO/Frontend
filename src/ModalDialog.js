// ModalDialog.js
import React from 'react';
import Modal from 'react-modal';

const ModalDialog = ({ isOpen, closeModal, handleSignin, guestLogin }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>그런 아이디는 없단다. 회원가입 또는 게스트 플레이 선택</h2>
      <button onClick={closeModal}>닫기</button>
      <button onClick={handleSignin}>회원가입</button>
      <button onClick={guestLogin}>게스트 플레이</button>
    </Modal>
  );
};

export default ModalDialog;
