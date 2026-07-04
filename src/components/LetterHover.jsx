import React from 'react';

const LetterHover = ({ text, className = "" }) => {
  const characters = text.split("");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => {
        if (char === " ") {
          // Render non-breaking space for layout spacing
          return (
            <span key={index} className="inline-block w-[0.27em]">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            className="animate-rubber cursor-default select-none hover:text-accent transition-colors duration-150"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default LetterHover;
