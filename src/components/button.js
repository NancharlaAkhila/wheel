// components/UI/Button.js
import React from 'react';
import '../Styles/button.css';

function Button({ text, onClick, type = 'button', style }) {
  return (
    <button className="custom-button" onClick={onClick} type={type} style={style}>
      {text}
    </button>
  );
}

export default Button;
