import { useState, useCallback, useRef } from 'react';

export function useParentGate() {
  const [isLocked, setIsLocked] = useState(true);
  const [challenge, setChallenge] = useState({ a: 0, b: 0 });
  const [attempts, setAttempts] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateChallenge = useCallback(() => {
    const a = Math.floor(Math.random() * 20) + 10;
    const b = Math.floor(Math.random() * 20) + 10;
    setChallenge({ a, b });
    setAttempts(0);
  }, []);

  const checkAnswer = useCallback(
    (answer: number): boolean => {
      const correct = challenge.a + challenge.b;
      if (answer === correct) {
        setIsLocked(false);
        setAttempts(0);
        // Auto-lock after 5 minutes
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        lockTimerRef.current = setTimeout(() => {
          setIsLocked(true);
        }, 5 * 60 * 1000);
        return true;
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          const end = Date.now() + 60 * 1000;
          setCooldownEnd(end);
          setTimeout(() => {
            setCooldownEnd(null);
            setAttempts(0);
            generateChallenge();
          }, 60 * 1000);
        }
        return false;
      }
    },
    [challenge, attempts, generateChallenge]
  );

  const isCoolingDown = cooldownEnd !== null && Date.now() < cooldownEnd;

  return {
    isLocked,
    challenge,
    attempts,
    isCoolingDown,
    cooldownEnd,
    generateChallenge,
    checkAnswer,
    lock: () => setIsLocked(true),
  };
}
