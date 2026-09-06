import React, { useRef } from "react";
import "./PostTaskButtonCss.css"; // CSS moved to a separate file

const PostTaskButton = ({text, type = "button", disabled = false, className = ""}) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  };

  const baseClasses = "glow-btn bg-[#1f1f1f] text-white rounded-full px-9 py-3.5 font-semibold transition hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <span className="icon-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </span>
      {text}
    </button>
  );
};

export default PostTaskButton;
