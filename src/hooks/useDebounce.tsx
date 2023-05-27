import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<string | null>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debouncedValue;
}
