import { useCallback, useEffect, useRef, useState } from 'react';

interface ElementSize {
  ref: React.RefObject<HTMLElement>;
  width: number;
  height: number;
}

// Generic hook type
export function useElementSize<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  width: number;
  height: number;
} {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [updateSize]);

  return { ref, width: size.width, height: size.height };
}
