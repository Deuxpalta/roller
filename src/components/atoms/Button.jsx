import React from 'react';
import '../../styles/atoms/atoms.css';

function Button({ children, type = 'button', onClick }) {
  return (
    <button className="atom-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
