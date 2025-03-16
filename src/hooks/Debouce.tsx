import { useState, useEffect } from "react";

export function useDebounce(value: boolean | null, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => { 
    if (delay == 0) {
      setDebouncedValue(value);
      return
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
