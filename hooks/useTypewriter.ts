import { useState, useEffect } from 'react';

export const useTypewriter = (
  phrases: string[],
  typingSpeed: number = 50,
  pauseDuration: number = 2000
) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    // Phase 1: Pausing after typing is complete
    if (isPausing) {
      const timeout = setTimeout(() => {
        setText(''); // Instant clear (no reverse typing)
        setCharIndex(0);
        setIsPausing(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length); // Loop to next phrase
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Phase 2: Typing characters
    const currentPhrase = phrases[phraseIndex];
    if (charIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentPhrase.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Finished typing current phrase
      setIsPausing(true);
    }
  }, [phrases, phraseIndex, charIndex, isPausing, typingSpeed, pauseDuration]);

  return text;
};