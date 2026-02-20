import { useEffect, useRef } from 'react';

export const usePerformanceMonitoring = (componentName: string) => {
  const renderCount = useRef(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Set start time inside useEffect
    startTimeRef.current = performance.now();
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} rendered ${renderCount.current} times`);
    }

    return () => {
      const endTime = performance.now();
      const timeSpent = endTime - startTimeRef.current;
      
      if (timeSpent > 1000 && process.env.NODE_ENV === 'development') {
        console.warn(`[Performance] ${componentName} was mounted for ${Math.round(timeSpent)}ms`);
      }
    };
  }, [componentName]);
};