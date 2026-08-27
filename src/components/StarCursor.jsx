import React, { useEffect, useRef } from 'react';

const StarCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    // Added more vibrant colors for the stars
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff', '#2563eb', '#f87171', '#fcd34d', '#34d399', '#a78bfa', '#f472b6', '#fb923c', '#2dd4bf'];

    class Particle {
      constructor(x, y, isBlast = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + (isBlast ? 4 : 2); // Larger stars 
        
        const speedMult = isBlast ? (Math.random() * 5 + 3) : 1;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2 * speedMult;
        
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity;
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.015 + (isBlast ? 0.01 : 0.015); // Lasts longer
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        
        // Add a glowing effect to make the colors pop
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        // Draw a 5-pointed star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * this.size, -Math.sin((18 + i * 72) / 180 * Math.PI) * this.size);
          ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * (this.size / 2), -Math.sin((54 + i * 72) / 180 * Math.PI) * (this.size / 2));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      // Spawn 5-8 stars per mouse move event for a dense trail
      const count = Math.floor(Math.random() * 4) + 5;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(e.clientX, e.clientY, false));
      }
    };

    const handleMouseDown = (e) => {
      // Spawn a huge burst of 80 stars on click
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default StarCursor;
