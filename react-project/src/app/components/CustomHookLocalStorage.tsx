import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    } else {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
  });

  useEffect(() => {
    if (value === undefined && typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  }, [key, value]);

  return [value, setValue];
};
