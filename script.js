// ==========================================
// ADVANCED FULL STACK PORTFOLIO - JAVASCRIPT
// Interactive Features & Animations
// ==========================================

// ========== GLOBAL VARIABLES ==========
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU TOGGLE ==========
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ========== SMOOTH SCROLL & ACTIVE NAV ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========== DARK MODE TOGGLE ==========
if (themeToggle) {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Update icon
        if (document.body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ========== TYPING ANIMATION ==========
const typingText = document.getElementById('typingText');
if (typingText) {
    const texts = [
        'Full Stack Web Developer',
        'React & Node.js Expert',
        'UI/UX Enthusiast',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingDelay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
}

// ========== PROJECT FILTERING ==========
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== ANIMATED SKILL BARS ==========
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// ========== ANIMATED COUNTERS ==========
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            setTimeout(updateCounter, 20);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Animate counters
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (counter.textContent === '0') {
                        animateCounter(counter);
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ========== CONTACT FORM HANDLING ==========
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && message) {
            // Create mailto link
            const mailtoLink = `mailto:pradhappns222@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
            
            // Open mail client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ========== PARTICLE BACKGROUND EFFECT ==========
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(0, 212, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const duration = 3000 + Math.random() * 2000;
    const animation = particle.animate([
        {
            transform: 'translateY(0px)',
            opacity: 0
        },
        {
            transform: `translateY(${Math.random() * 100 - 50}px)`,
            opacity: 1
        },
        {
            transform: `translateY(${Math.random() * 200 - 100}px)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically (subtle effect)
if (window.innerWidth > 768) {
    setInterval(createParticle, 500);
}

// ========== SMOOTH ENTRANCE ANIMATIONS ==========
window.addEventListener('load', () => {
    // Add entrance animation to hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Initialize skill bars to 0 width
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0%';
    });
});

// ========== CURSOR GLOW EFFECT (Desktop only) ==========
if (window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.width = '300px';
        glow.style.height = '300px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.left = (e.clientX - 150) + 'px';
        glow.style.top = (e.clientY - 150) + 'px';
        glow.style.zIndex = '0';
        glow.style.transition = 'opacity 0.3s';
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '0';
            setTimeout(() => glow.remove(), 300);
        }, 100);
    });
}

// ========== CONSOLE EASTER EGG ==========
console.log('%c👋 Hi there, Developer!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #a855f7; font-size: 14px;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #fbbf24; font-size: 14px;');
