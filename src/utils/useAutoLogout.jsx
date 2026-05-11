import { useEffect } from "react";

const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 min

export default function useAutoLogout(logoutFn) {
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      const now = Date.now();
      localStorage.setItem("lastActivity", now.toString());

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        logoutFn();
      }, INACTIVITY_LIMIT);
    };

    const handleStorageChange = (e) => {
      if (e.key === "lastActivity") {
        resetTimer(); // sync across tabs
      }
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    window.addEventListener("storage", handleStorageChange);

    // Initial start
    resetTimer();

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      window.removeEventListener("storage", handleStorageChange);
      if (timeout) clearTimeout(timeout);
    };
  }, [logoutFn]);
}