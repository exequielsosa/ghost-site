"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
}: AnimatedCounterProps) {
  // SSR/HTML inicial = número real (Google y scrapers sin JS lo ven). En el
  // cliente arrancamos la cuenta en 0 y animamos hasta `end`. Como el contenido
  // está oculto por el fade de entrada hasta que monta, el `end` del HTML nunca
  // se ve: la animación arranca limpia, sin parpadeo.
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Cliente: preparamos la cuenta en 0 para animar desde ahí.
    setCount(0);

    let animationId: number;

    const startAnimation = () => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };
      animationId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Anima al entrar en viewport: en la carga inicial y cada vez que se
          // vuelve a una tab.
          startAnimation();
        } else {
          // Al ocultarse (cambio de tab o fuera de viewport), resetea para
          // volver a animar al reaparecer. Como no se ve, no hay parpadeo.
          cancelAnimationFrame(animationId);
          setCount(0);
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}
