import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const containerRef = useRef(null);
  const animationRef = useRef();

  const [dots, setDots] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();

    const particles = Array.from({ length: 50 }, () => ({
      id: crypto.randomUUID(),
      x: Math.random() * width,
      y: Math.random() * height,

      // Different speed per particle
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,

      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    setDots(particles);

    const animate = () => {
      setDots((prev) =>
        prev.map((dot) => {
          let x = dot.x + dot.vx;
          let y = dot.y + dot.vy;
          let vx = dot.vx;
          let vy = dot.vy;

          if (x <= 0 || x >= width) vx *= -1;
          if (y <= 0 || y >= height) vy *= -1;

          return {
            ...dot,
            x,
            y,
            vx,
            vy,
          };
        }),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-1 w-full h-full">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-white-500"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.x,
            top: dot.y,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}
