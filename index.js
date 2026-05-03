// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Typed Text Effect
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const roles = ['Frontend Developer', 'React Enthusiast', 'Problem Solver', 'Creative Thinker'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMessage.textContent = '🎉 Thanks! I\'ll get back to you within 24 hours.';
            formMessage.style.color = '#00ff88';
            formMessage.style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // Scroll Reveal Animation
    const cards = document.querySelectorAll('.skill-card, .project-card, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    console.log('🚀 Portfolio ready!');
});

// Project Modal Data
const projectData = {
    shophub: {
        title: '🛍️ ShopHub - E-Commerce Platform',
        icon: '🛍️',
        description: `A fully functional e-commerce web application built with React.js. Features include product listing, shopping cart, wishlist, search functionality, category filters, and persistent storage using localStorage.`,
        fullDescription: `ShopHub is a comprehensive e-commerce solution that demonstrates modern React patterns and best practices. The application fetches product data from the FakeStoreAPI and provides users with a seamless shopping experience.`,
        techStack: ['React.js', 'Tailwind CSS', 'Context API', 'Axios', 'LocalStorage'],
        features: [
            '🛒 Shopping Cart - Add/remove items, update quantities',
            '❤️ Wishlist - Save favorite products, move to cart',
            '🔍 Search - Search products by name or category',
            '📂 Category Filters - Filter products by category',
            '💾 Local Storage - Cart and wishlist persist after refresh',
            '📱 Responsive Design - Works on all devices'
        ],
        challenges: 'Managing global state for cart and wishlist across multiple components, implementing real-time search with API data, and ensuring smooth animations.',
        learnings: 'Deepened understanding of React Context API, improved skills in Tailwind CSS for complex layouts, learned best practices for localStorage persistence.',
        github: 'https://github.com/jyoti-0702/E-commerce-React-App',
        liveDemo: null
    },
    portfolio: {
        title: '🌟 Personal Portfolio Website',
        icon: '🌟',
        description: `A modern, responsive portfolio website showcasing my skills, projects, and professional journey as a frontend developer.`,
        fullDescription: `This portfolio website was built from scratch using HTML, CSS, and JavaScript. It features a dark theme, smooth animations, responsive design, and a modal popup for project details.`,
        techStack: ['HTML5', 'CSS3', 'JavaScript'],
        features: [
            '🎨 Modern dark theme design',
            '📱 Fully responsive layout',
            '✨ Smooth scroll animations',
            '💼 Project showcase with modals',
            '📧 Contact form',
            '⚡ Fast and optimized'
        ],
        challenges: 'Creating smooth animations without libraries, ensuring responsive design across all devices, and implementing modal popups.',
        learnings: 'Advanced CSS techniques, JavaScript DOM manipulation, responsive design principles, and cross-browser compatibility.',
        github: null,
        liveDemo: null
    }
};

// Open Modal Function
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (!project) return;
    
    const githubLink = project.github ? `<a href="${project.github}" target="_blank" class="modal-link">📂 View on GitHub</a>` : '';
    
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <div class="modal-project-icon">${project.icon}</div>
            <h2 class="modal-project-title">${project.title}</h2>
        </div>
        
        <div class="modal-section">
            <h4>📝 Description</h4>
            <p style="color: var(--text-secondary);">${project.description}</p>
            <p style="color: var(--text-secondary); margin-top: 0.5rem;">${project.fullDescription}</p>
        </div>
        
        <div class="modal-section">
            <h4>🛠️ Tech Stack</h4>
            <div class="project-tech">
                ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-section">
            <h4>✨ Key Features</h4>
            <ul style="color: var(--text-secondary); margin-left: 1.5rem;">
                ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4>💡 Challenges Faced</h4>
            <p style="color: var(--text-secondary);">${project.challenges}</p>
        </div>
        
        <div class="modal-section">
            <h4>📚 What I Learned</h4>
            <p style="color: var(--text-secondary);">${project.learnings}</p>
        </div>
        
        <div class="modal-links">
            ${githubLink}
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
}