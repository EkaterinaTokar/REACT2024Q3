import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(JSON.stringify(storedValue)) : initialValue;
    //return initialValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  }, [key, value]);

  return [value, setValue];
};
