import { useEffect, useRef } from 'react';

const INACTIVITY_LIMIT = 15 * 60 * 1000;

export default function useAutoLogout(logoutFn) {
  const timeoutRef = useRef();

  useEffect(() => {
    const resetTimer = () => {
      localStorage.setItem('lastActivity', Date.now());

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        console.log('AUTO LOGOUT');
        logoutFn();
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // start timer first time
    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [logoutFn]);
}
