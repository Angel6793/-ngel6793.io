// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    // Contador para el slider de testimonios
    let currentTestimonial = 0;
    
    // Menú móvil toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Cambiar apariencia del botón hamburguesa
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Quitar clase active de todos los enlaces
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Añadir clase active al enlace actual
            this.classList.add('active');
        });
    });
    
    // Activar enlace de navegación según la sección visible
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Obtener todas las secciones
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Cambiar estilo de la barra de navegación al hacer scroll
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Filtro de proyectos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar clase active de todos los botones
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            
            // Añadir clase active al botón actual
            this.classList.add('active');
            
            // Obtener categoría del botón
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Función para mostrar el testimonio actual
    function showTestimonial() {
        testimonialCards.forEach((card, index) => {
            card.style.transform = `translateX(${100 * (index - currentTestimonial)}%)`;
        });
    }
    
    // Inicializar el slider de testimonios
    showTestimonial();
    
    // Botones de navegación para testimonios
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial > 0) ? currentTestimonial - 1 : testimonialCards.length - 1;
            showTestimonial();
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial < testimonialCards.length - 1) ? currentTestimonial + 1 : 0;
            showTestimonial();
        });
    }
    
    // Auto-rotación de testimonios
    setInterval(function() {
        currentTestimonial = (currentTestimonial < testimonialCards.length - 1) ? currentTestimonial + 1 : 0;
        showTestimonial();
    }, 5000);
    
    // Validación y envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            
            // Crear elemento de alerta
            const alert = document.createElement('div');
            alert.className = 'alert alert-success';
            alert.innerHTML = `
                <p>¡Gracias por contactarnos, ${name}!</p>
                <p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
            `;
            
            // Insertar alerta antes del formulario
            contactForm.parentNode.insertBefore(alert, contactForm);
            
            // Resetear formulario
            contactForm.reset();
            
            // Eliminar alerta después de 5 segundos
            setTimeout(function() {
                alert.remove();
            }, 5000);
        });
    }
    
    // Validación y envío del formulario de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener email
            const email = this.querySelector('input[type="email"]').value;
            
            // Crear elemento de alerta
            const alert = document.createElement('div');
            alert.className = 'alert alert-success';
            alert.innerHTML = `
                <p>¡Gracias por suscribirte a nuestro newsletter!</p>
                <p>Pronto recibirás noticias y actualizaciones en ${email}.</p>
            `;
            
            // Insertar alerta antes del formulario
            newsletterForm.parentNode.insertBefore(alert, newsletterForm);
            
            // Resetear formulario
            newsletterForm.reset();
            
            // Eliminar alerta después de 5 segundos
            setTimeout(function() {
                alert.remove();
            }, 5000);
        });
    }
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Añadir clase animate-on-scroll a elementos que queremos animar
    const addAnimationClass = function() {
        const elementsToAnimate = [
            '.service-card',
            '.project-card',
            '.testimonial-card',
            '.about-image',
            '.about-text',
            '.contact-info',
            '.contact-form'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('animate-on-scroll');
            });
        });
    };
    
    // Inicializar animaciones
    addAnimationClass();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Añadir estilos adicionales para el slider de testimonios
    testimonialCards.forEach(card => {
        card.style.transition = 'transform 0.5s ease';
    });
    
    // Añadir animación a las alertas
    const addAlertStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            .alert {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: var(--border-radius);
                animation: fadeIn 0.5s ease;
            }
            
            .alert-success {
                background-color: rgba(16, 185, 129, 0.1);
                border: 1px solid var(--success-color);
                color: var(--success-color);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    };
    
    addAlertStyles();
    
    // Añadir estilos para el menú móvil
    const addMobileMenuStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .menu-toggle {
                    display: block;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 80%;
                    height: calc(100vh - 70px);
                    background-color: white;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 2rem;
                    transition: var(--transition);
                    box-shadow: var(--box-shadow);
                }
                
                .nav-menu.active {
                    left: 0;
                }
                
                .nav-menu li {
                    margin: 1rem 0;
                    width: 100%;
                }
                
                .nav-link {
                    display: block;
                    padding: 0.5rem 0;
                    font-size: 1.2rem;
                }
                
                .menu-toggle.active .bar:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                
                .menu-toggle.active .bar:nth-child(2) {
                    opacity: 0;
                }
                
                .menu-toggle.active .bar:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
                
                .hero .container,
                .about-content {
                    grid-template-columns: 1fr;
                }
                
                .hero-image {
                    order: -1;
                }
                
                .about-stats {
                    grid-template-columns: 1fr;
                }
                
                .projects-grid,
                .services-grid {
                    grid-template-columns: 1fr;
                }
                
                .contact-content {
                    flex-direction: column;
                }
                
                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addMobileMenuStyles();
    
    // Completar estilos CSS faltantes
    const addMissingStyles = function() {
        const style = document.createElement('style');
        style.textContent = `
            .contact-content {
                display: flex;
                gap: 3rem;
            }
            
            .contact-info, .contact-form {
                flex: 1;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .contact-item i {
                font-size: 1.5rem;
                color: var(--primary-color);
                margin-right: 1rem;
                width: 40px;
                height: 40px;
                background-color: rgba(37, 99, 235, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .social-links {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .social-links a {
                width: 40px;
                height: 40px;
                background-color: var(--light-color);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
            }
            
            .social-links a:hover {
                background-color: var(--primary-color);
                color: white;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.8rem;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-family: inherit;
                font-size: 1rem;
            }
            
            .form-group textarea {
                height: 150px;
                resize: vertical;
            }
            
            footer {
                background-color: var(--secondary-color);
                color: white;
                padding: 4rem 0 1rem;
            }
            
            .footer-content {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 2fr;
                gap: 3rem;
                margin-bottom: 3rem;
            }
            
            .footer-logo h2 {
                font-size: 1.8rem;
                margin-bottom: 1rem;
            }
            
            .footer-logo span {
                color: var(--primary-color);
            }
            
            .footer-links h3,
            .footer-services h3,
            .footer-newsletter h3 {
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
                position: relative;
            }
            
            .footer-links h3::after,
            .footer-services h3::after,
            .footer-newsletter h3::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 30px;
                height: 2px;
                background-color: var(--primary-color);
            }
            
            .footer-links ul li,
            .footer-services ul li {
                margin-bottom: 0.8rem;
            }
            
            .footer-links a,
            .footer-services a {
                color: #cbd5e1;
                transition: var(--transition);
            }
            
            .footer-links a:hover,
            .footer-services a:hover {
                color: var(--primary-color);
                padding-left: 5px;
            }
            
            .footer-newsletter p {
                margin-bottom: 1.5rem;
                color: #cbd5e1;
            }
            
            .footer-newsletter form {
                display: flex;
            }
            
            .footer-newsletter input {
                flex: 1;
                padding: 0.8rem;
                border: none;
                border-radius: var(--border-radius) 0 0 var(--border-radius);
            }
            
            .footer-newsletter button {
                border-radius: 0 var(--border-radius) var(--border-radius) 0;
            }
            
            .footer-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 2rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .footer-legal {
                display: flex;
                gap: 1.5rem;
            }
            
            .footer-legal a {
                color: #cbd5e1;
                transition: var(--transition);
            }
            
            .footer-legal a:hover {
                color: var(--primary-color);
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .testimonial-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .testimonial-controls button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: white;
                border: 1px solid var(--gray-color);
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .testimonial-controls button:hover {
                background-color: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }
            
            .testimonial-author {
                display: flex;
                align-items: center;
                margin-top: 1.5rem;
            }
            
            .testimonial-author img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 1rem;
            }
            
            .testimonial-author h4 {
                margin-bottom: 0.2rem;
            }
            
            .testimonial-author p {
                color: var(--gray-color);
                margin-bottom: 0;
            }
            
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-on-scroll.animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    };
    
    addMissingStyles();
});