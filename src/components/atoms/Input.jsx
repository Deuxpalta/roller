import React from 'react';
import '../../styles/atoms/atoms.css';

function Input({ type = 'text', value, onChange, placeholder, name, id }) {
  return (
    <input
      className="atom-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
    />
  );
}

export default Input;
