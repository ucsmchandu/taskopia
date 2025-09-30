import React from 'react';
import './style.css';

const Button = ({ text }) => {
  return (
    <button type="button" className="button">
      <div className="points_wrapper">
        {Array.from({ length: 10 }).map((_, i) => (
          <i className="point" key={i}></i>
        ))}
      </div>

      <span className="inner">
        {text}
        <svg
          className="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </span>
    </button>
  );
};

export default Button;
