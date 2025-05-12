import { useEffect, useRef } from "react";

type ParticleProps = { className?: string };
type Particle = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
};

const OptimizedParticlesEffect: React.FC<ParticleProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);

  const config = {
    particles: {
      number: 130,
      color: "#ffffff",
      size: { value: 3, random: true, min: 1 },
      opacity: { value: 0.5, random: true, min: 0.3 },
      speed: 2,
      outMode: "out",
      lineLinked: { enable: true, distance: 160, opacity: 0.4, width: 1 },
    },
    interactivity: {
      detectOn: "canvas",
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: false, mode: null },
      },
      modes: {
        grab: { distance: 200, lineOpacity: 0.8 },
        repulse: { distance: 200, duration: 1000 },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvasRef.current.width = width * devicePixelRatio;
      canvasRef.current.height = height * devicePixelRatio;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.scale(devicePixelRatio, devicePixelRatio);
      initParticles(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove as EventListener);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < config.particles.number; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: config.particles.size.random
          ? Math.random() * config.particles.size.value +
            config.particles.size.min
          : config.particles.size.value,
        opacity: config.particles.opacity.random
          ? Math.random() *
              (config.particles.opacity.value - config.particles.opacity.min) +
            config.particles.opacity.min
          : config.particles.opacity.value,
        vx: (Math.random() - 0.5) * config.particles.speed,
        vy: (Math.random() - 0.5) * config.particles.speed,
      });
    }
    particlesRef.current = particles;
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      // Update particles
      const particles = particlesRef.current;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (config.particles.outMode === "out") {
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        } else {
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
      });

      // Draw connections
      if (config.particles.lineLinked.enable) {
        const linkDistance = config.particles.lineLinked.distance;
        const linkOpacity = config.particles.lineLinked.opacity;
        ctx.lineWidth = config.particles.lineLinked.width;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < linkDistance) {
              const opacity = linkOpacity * (1 - distance / linkDistance);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Mouse interactions
      if (
        config.interactivity.events.onHover.enable &&
        config.interactivity.events.onHover.mode === "grab" &&
        mouseRef.current.active
      ) {
        const mousePos = mouseRef.current;
        const grabDistance = config.interactivity.modes.grab.distance;
        const lineOpacity = config.interactivity.modes.grab.lineOpacity;
        particlesRef.current.forEach((p) => {
          const dx = p.x - mousePos.x,
            dy = p.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < grabDistance) {
            const opacity = lineOpacity * (1 - distance / grabDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
          }
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`relative h-screen overflow-hidden bg-black ${className}`}
      ref={containerRef}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default OptimizedParticlesEffect;
