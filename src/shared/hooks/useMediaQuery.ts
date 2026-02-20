import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Use lazy initial state to avoid setState in useEffect
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', handleChange);
    
    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}