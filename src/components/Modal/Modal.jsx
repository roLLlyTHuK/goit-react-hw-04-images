import React from 'react';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { isOpen, image, onClose } = this.props;
    return (
      <div className={`Overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
        <div className="Modal" onClick={(e) => e.stopPropagation()}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}


