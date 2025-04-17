
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    const particleCount = Math.floor(window.innerWidth / 30);
    const particles: Particle[] = [];
    
    const colors = [
      'rgba(139, 92, 246, 0.15)', // purple (more dimmed)
      'rgba(14, 165, 233, 0.15)', // blue (more dimmed)
      'rgba(16, 185, 129, 0.15)', // green (more dimmed)
    ];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    // Single render instead of animation loop
    ctx.fillStyle = 'rgba(10, 15, 24, 0.2)'; // Darker background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw static particles
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Draw connections between nearby particles
    particles.forEach((particle, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particle.x - particles[j].x;
        const dy = particle.y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 70) { // Reduced connection distance
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.01 * (1 - distance / 70)})`; // Even dimmer connections
          ctx.lineWidth = 0.2; // Thinner lines
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticleBackground;
