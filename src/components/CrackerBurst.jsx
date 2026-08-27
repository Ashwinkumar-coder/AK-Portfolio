import React, { useEffect, useRef } from 'react';

const VIBRANT_COLORS = [
  '#FF2A5F', // Rose pink
  '#05FFA1', // Emerald neon green
  '#00F0FF', // Electric cyan
  '#FFB000', // Deep gold
  '#DF42FF', // Bright violet
  '#FF5E00', // Festive orange
  '#FFFFFF'  // Sparkling white
];

const GOLDEN_COLORS = [
  '#FFE600', // Bright gold
  '#FFB700', // Amber gold
  '#FF8800', // Orange gold
  '#FFF9D0'  // White-hot gold
];

export default function CrackerBurst() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);
  const isLooping = useRef(false);

  // Resize canvas to cover screen properly
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation Loop
  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    // Standard transparent clear (prevents tinting background)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particles.length === 0) {
      isLooping.current = false;
      return;
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Update physics
      p.xPrev = p.x;
      p.yPrev = p.y;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.fade;

      // Handle custom behavior based on type
      if (p.type === 'crackler') {
        // Flicker opacity
        p.currentAlpha = Math.max(0, p.alpha * (0.3 + Math.random() * 0.7));
      } else {
        p.currentAlpha = p.alpha;
      }

      // Check if dead
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      // Draw particle
      ctx.save();
      ctx.globalAlpha = p.currentAlpha;

      if (p.type === 'flash') {
        // Main explosive flash
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 220, 100, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spark') {
        // Sparkler line (thin glowing trail)
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.xPrev, p.yPrev);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Subtle glow overlay (fast method)
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.currentAlpha * 0.3;
        ctx.lineWidth = p.size * 3;
        ctx.beginPath();
        ctx.moveTo(p.xPrev, p.yPrev);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      } else if (p.type === 'star') {
        // Glowing star circle
        // 1. Draw outer glow
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.currentAlpha * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw inner solid star core
        ctx.globalAlpha = p.currentAlpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'crackler') {
        // Sparkler twinkle crackles
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    animationFrameId.current = requestAnimationFrame(loop);
  };

  // Spawn a cracker burst
  const burst = (x, y) => {
    const newParticles = [];

    // 1. Initial explosion flash
    newParticles.push({
      x,
      y,
      xPrev: x,
      yPrev: y,
      vx: 0,
      vy: 0,
      gravity: 0,
      drag: 1,
      size: 40 + Math.random() * 20,
      color: '#FFFFFF',
      alpha: 1,
      fade: 0.15, // Dies in ~7 frames
      type: 'flash'
    });

    // 2. Spawn sparkler line particles (gold theme)
    const numSparks = 25 + Math.floor(Math.random() * 15);
    for (let i = 0; i < numSparks; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High speed, wide spread
      const speed = 3 + Math.random() * 9;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = GOLDEN_COLORS[Math.floor(Math.random() * GOLDEN_COLORS.length)];

      newParticles.push({
        x,
        y,
        xPrev: x,
        yPrev: y,
        vx,
        vy,
        gravity: 0.18 + Math.random() * 0.08, // Pulls downwards
        drag: 0.94 + Math.random() * 0.02,    // High air resistance
        size: 1 + Math.random() * 1.5,
        color,
        alpha: 1,
        fade: 0.012 + Math.random() * 0.012,  // Custom fade durations
        type: 'spark'
      });
    }

    // 3. Spawn colorful firework stars (festive color bursts)
    const numStars = 20 + Math.floor(Math.random() * 10);
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];

      newParticles.push({
        x,
        y,
        xPrev: x,
        yPrev: y,
        vx,
        vy,
        gravity: 0.06 + Math.random() * 0.04, // Soft gravity
        drag: 0.96 + Math.random() * 0.01,    // Soft drag
        size: 2.2 + Math.random() * 1.8,
        color,
        alpha: 1,
        fade: 0.008 + Math.random() * 0.008,
        type: 'star'
      });
    }

    // 4. Spawn cracklers (micro flashing sparkles)
    const numCracklers = 15 + Math.floor(Math.random() * 15);
    for (let i = 0; i < numCracklers; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      // High sparkle look
      const color = Math.random() > 0.3 ? '#FFF9D0' : '#FFFFFF';

      newParticles.push({
        x,
        y,
        xPrev: x,
        yPrev: y,
        vx,
        vy,
        gravity: 0.1 + Math.random() * 0.05,
        drag: 0.92 + Math.random() * 0.02,
        size: 0.8 + Math.random() * 0.8,
        color,
        alpha: 1,
        fade: 0.02 + Math.random() * 0.02,
        type: 'crackler'
      });
    }

    particlesRef.current.push(...newParticles);

    // If loop is not active, start it
    if (!isLooping.current) {
      isLooping.current = true;
      loop();
    }
  };

  const burstRef = useRef(burst);
  useEffect(() => {
    burstRef.current = burst;
  });

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Capture coordinates relative to the viewport
      const x = e.clientX;
      const y = e.clientY;
      burstRef.current(x, y);
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
}
