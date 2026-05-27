/**
 * Fondo Animado: Partículas y Circuitos Suaves
 * Un efecto visual premium usando HTML5 Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configuración del canvas para alta resolución
    let width, height;
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        // Escalar por dpr (Device Pixel Ratio) para pantallas retina
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Paleta de colores (Naranja Neón, Azul brillante, Cian)
    const colors = ['rgba(255, 126, 64, 0.8)', 'rgba(91, 140, 255, 0.8)', 'rgba(139, 233, 253, 0.6)'];
    
    // Sistema de Partículas
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocidad muy lenta y sutil
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebotar en los bordes suavemente
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Crear el pool de partículas
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Bucle de animación
    function animate() {
        requestAnimationFrame(animate);
        // Limpiar el canvas con algo de opacidad para efecto de estela muy suave
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Dibujar líneas/circuitos conectando partículas cercanas
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Si están lo suficientemente cerca, dibujar una conexión (estilo red/circuito)
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Opacidad basada en la distancia, aumentada para que destaque
                    const opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(91, 140, 255, ${opacity * 0.6})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    animate();
});
