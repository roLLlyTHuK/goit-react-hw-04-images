import React, { useEffect } from 'react';

export const Modal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={`Overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="foto" />
      </div>
    </div>
  );
};


