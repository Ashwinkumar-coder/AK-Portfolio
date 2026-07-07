import React from 'react';

const LetterHover = ({ text, className = "" }) => {
  // Split text by space first to preserve word boundaries when wrapping on smaller screens
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="animate-rubber cursor-default select-none hover:text-accent transition-colors duration-150 inline-block"
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="inline-block w-[0.27em]">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

export default LetterHover;
