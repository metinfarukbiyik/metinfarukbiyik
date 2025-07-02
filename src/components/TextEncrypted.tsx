import { useState, useEffect } from 'react';
import type { TextEncryptedProps } from '../types';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

export const TextEncrypted: React.FC<TextEncryptedProps> = ({
  text,
  interval = 100,
  loop = false,
}) => {
  const [outputText, setOutputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer: number;
    let loopTimer: number;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
          
          // If loop is enabled, restart after 2 seconds
          if (loop) {
            loopTimer = setTimeout(() => {
              setOutputText("");
            }, 2000);
          }
        }
      }, interval);
    } else if (loop && outputText === text) {
      // If we're at the end and loop is enabled, restart
      loopTimer = setTimeout(() => {
        setOutputText("");
      }, 2000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(loopTimer);
    };
  }, [text, interval, outputText, loop]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      : "";

  if (!isMounted) {
    return <span> </span>;
  }

  return (
    <span>
      {outputText}
      {remainder}
    </span>
  );
}; 