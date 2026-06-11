import { useEffect, useRef } from 'react';

const INACTIVITY_LIMIT = 6 * 60 * 60 * 1000;
const STORAGE_KEY = 'lastActivity';

export default function useAutoLogout(logoutFn) {
  const logoutRef = useRef(logoutFn);
  const timeoutRef = useRef();

  // Keep logoutRef current without re-running the effect
  useEffect(() => {
    logoutRef.current = logoutFn;
  }, [logoutFn]);

  useEffect(() => {
    let lastWrite = 0;

    const scheduleLogout = (delay) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        logoutRef.current();
      }, delay);
    };

    const resetTimer = () => {
      const now = Date.now();

      // Throttle localStorage writes to once per second
      if (now - lastWrite > 1000) {
        localStorage.setItem(STORAGE_KEY, now);
        lastWrite = now;
      }

      scheduleLogout(INACTIVITY_LIMIT);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Tab became active — check how much time has elapsed
        const last = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        const elapsed = last ? Date.now() - last : 0;

        if (elapsed >= INACTIVITY_LIMIT) {
          logoutRef.current();
        } else {
          scheduleLogout(INACTIVITY_LIMIT - elapsed);
        }
      } else {
        // Tab hidden — no point running the timer
        clearTimeout(timeoutRef.current);
      }
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // On mount: resume from stored activity if available
    const last = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const elapsed = last ? Date.now() - last : 0;

    if (elapsed >= INACTIVITY_LIMIT) {
      logoutRef.current();
    } else {
      scheduleLogout(last ? INACTIVITY_LIMIT - elapsed : INACTIVITY_LIMIT);
    }

    return () => {
      clearTimeout(timeoutRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // stable — logoutFn accessed via ref
}
