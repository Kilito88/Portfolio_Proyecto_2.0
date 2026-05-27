/**
 * Lógica para las animaciones específicas (Contadores y Tilt Cards)
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       EFECTO TILT PARA LAS TARJETAS (Glassmorphism 3D)
       ========================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    // Solo aplicar efecto tilt en pantallas grandes (no táctiles)
    if (window.matchMedia("(min-width: 1024px)").matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calcular la rotación basándose en el ratón
                const rotateX = ((y - centerY) / centerY) * -10; // Max rotación: 10 grados
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
    }

    /* ==========================================
       CONTADORES ANIMADOS
       ========================================== */
    // Esta función se llama desde main.js cuando la sección entra en el viewport
    window.initCounters = function(container) {
        const counters = container.querySelectorAll('.counter');
        const speed = 200; // Cuanto más bajo, más rápido
        
        counters.forEach(counter => {
            // Verificar si ya se ha animado para no repetirlo
            if (counter.classList.contains('counted')) return;
            
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calcular incremento
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animate, 20);
                } else {
                    counter.innerText = target;
                    // Agregar el signo "+" a algunos contadores si lo deseamos
                    if (target > 50) {
                        counter.innerText = target + '%';
                    } else if (target > 10) {
                        counter.innerText = target + '+';
                    }
                    counter.classList.add('counted');
                }
            };
            
            animate();
        });
    };
});
