import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './Modal.css';

//NOTE: FOR THIS TO WORK, YOU MUST ADD A DIV WITH ID "modal" IN index.html
//<div id="modal"></div> <!-- ✅ Dedicated modal container -->

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'auto'; // Restore scroll
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Render into #modal container instead of document.body
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal') // ⬅️ Mount inside #modal container
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Modal Content</h1>
        <p>This is the content inside the modal</p>
      </Modal>
    </div>
  );
};

export default App;
