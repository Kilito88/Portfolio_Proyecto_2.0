window.addEventListener('load', () => {
    // Lógica del Loader Inicial
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
    }, 2200); // Esperar a que la barra se llene
});

document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       CURSOR PERSONALIZADO
       ========================================== */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (cursor && follower && window.matchMedia("(min-width: 769px)").matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Mover el punto central instantáneamente
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Bucle de animación para que el círculo exterior siga con retraso (efecto suave)
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        
        // Efecto Hover en enlaces y botones
        const interactables = document.querySelectorAll('a, button, .hover-glow, .project-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                follower.classList.add('cursor-follower-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                follower.classList.remove('cursor-follower-hover');
            });
        });
    }

    /* ==========================================
       NAVBAR STICKY Y MENÚ MÓVIL
       ========================================== */
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Efecto de scroll en Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menú móvil
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animar el ícono de hamburguesa
            mobileBtn.classList.toggle('open');
            const spans = mobileBtn.querySelectorAll('span');
            if (mobileBtn.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileBtn.click();
            }
        });
    });

    /* ==========================================
       ANIMACIONES DE SCROLL (INTERSECTION OBSERVER)
       ========================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Si la sección tiene barras de progreso, las animamos
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
                
                // Disparar los contadores si existen en esta sección
                if (typeof window.initCounters === 'function') {
                    window.initCounters(entry.target);
                }
                
                // Opcional: dejar de observar una vez que se muestra
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ==========================================
       FORMULARIO DE CONTACTO (SIMULACIÓN)
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            // Simular petición
            setTimeout(() => {
                btn.innerHTML = '¡Mensaje Enviado!';
                btn.style.background = 'rgba(16, 185, 129, 0.2)';
                btn.style.borderColor = '#10B981';
                btn.style.color = '#10B981';
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
