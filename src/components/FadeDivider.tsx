// src/components/FadeDivider.tsx

import { useEffect, useRef, useState, CSSProperties } from 'react';

interface FadeDividerProps {
  style?: CSSProperties;
}

export default function FadeDivider({ style }: FadeDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '2px',
        width: '100%',
        margin: '32px 0',
        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(59, 130, 246, 0) 100%)',
        transformOrigin: 'left',
        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 1000ms ease-out',
        ...style
      }}
    />
  );
}