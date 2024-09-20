// app/components/TypingEffect.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 150, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const speedRef = useRef(speed);
  const mountedRef = useRef(true);

  const resetTyping = useCallback(() => {
    indexRef.current = 0;
    setDisplayedText('');
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    resetTyping();
  }, [text, resetTyping]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    if (displayedText === text && onComplete) {
      onComplete();
    }
  }, [displayedText, text, onComplete]);

  useEffect(() => {
    if (indexRef.current >= text.length) return;

    const timeoutId = setTimeout(() => {
      if (mountedRef.current) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      }
    }, speedRef.current);

    return () => clearTimeout(timeoutId);
  }, [text, displayedText]);

  return <span>{displayedText}</span>;
};