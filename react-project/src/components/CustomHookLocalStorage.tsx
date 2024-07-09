import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(JSON.stringify(storedValue));
    }
    return initialValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
