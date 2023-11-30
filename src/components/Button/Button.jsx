import React from 'react';

export const Button = ({ onClick, disabled }) => {
  return (
    <button type="button" className="Button" onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};
