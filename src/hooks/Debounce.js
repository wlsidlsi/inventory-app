import { useRef, useCallback } from 'react';

export function useDebounce() {
  // Store timers for each unique key
  const timers = useRef({});

  /**
   * debounce - Returns a debounced version of the provided callback.
   *
   * @param {string} key - Unique key for this debounced function.
   * @param {Function} callback - The function to debounce.
   * @param {number} delay - Delay in milliseconds.
   * @returns {Function} - The debounced function.
   */
  const debounce = useCallback((key, callback, delay = 300) => {
    return (...args) => {
      // If a timer already exists for this key, clear it
      if (timers.current[key]) {
        clearTimeout(timers.current[key]);
      }
      // Set a new timer for this key
      timers.current[key] = setTimeout(() => {
        callback(...args);
        // Clean up after executing the callback
        timers.current[key] = null;
      }, delay);
    };
  }, []);

  return debounce;
}