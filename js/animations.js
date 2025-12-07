// Animation System using GSAP
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Register GSAP plugins
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }
    
    // Entrance animations
    animateEntrance() {
        if (typeof gsap === 'undefined') return;
        
        const tl = gsap.timeline();
        
        tl.from('.phantom-mask', {
            scale: 0,
            rotation: -180,
            duration: 1,
            ease: 'back.out(1.7)'
        })
        .from('.main-title', {
            opacity: 0,
            y: -50,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.subtitle', {
            opacity: 0,
            duration: 0.6
        }, '-=0.3')
        .from('.bio-card', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.cta-button', {
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.3');
    }
    
    // Section transition animations
    transitionToSection(sectionId) {
        if (typeof gsap === 'undefined') return;
        
        const currentSection = document.querySelector('.section.active');
        const newSection = document.getElementById(sectionId);
        
        if (!currentSection || !newSection) return;
        
        const tl = gsap.timeline();
        
        tl.to(currentSection, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                currentSection.classList.remove('active');
            }
        })
        .fromTo(newSection, {
            opacity: 0,
            scale: 1.05
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
                newSection.classList.add('active');
            }
        }, '-=0.1');
    }
    
    // Card flip animation
    flipCard(cardElement) {
        if (typeof gsap === 'undefined') return;
        
        gsap.to(cardElement, {
            rotationY: 180,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                cardElement.classList.toggle('flipped');
                gsap.set(cardElement, { rotationY: 0 });
            }
        });
    }
    
    // Treasure card reveal animation
    revealTreasure(cardElement) {
        if (typeof gsap === 'undefined') return;
        
        gsap.fromTo(cardElement, {
            scale: 0,
            rotation: -180,
            opacity: 0
        }, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }
    
    // Particle burst effect
    createParticleBurst(x, y, color = '#00BFFF') {
        if (typeof gsap === 'undefined') return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.zIndex = '10000';
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 50 + Math.random() * 50;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => particle.remove()
            });
        }
    }
    
    // Loading screen animation
    hideLoadingScreen() {
        if (typeof gsap === 'undefined') {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            return;
        }
        
        gsap.to('#loadingScreen', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }
        });
    }
    
    // Stagger animation for grid items
    staggerGridItems(selector) {
        if (typeof gsap === 'undefined') return;
        
        gsap.from(selector, {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.6,
            stagger: CONFIG.animations.stagger,
            ease: 'power2.out'
        });
    }
    
    // Glitch text effect
    glitchText(element) {
        if (typeof gsap === 'undefined') return;
        
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        
        tl.to(element, {
            x: () => (Math.random() - 0.5) * 10,
            y: () => (Math.random() - 0.5) * 10,
            duration: 0.1,
            ease: 'power1.inOut'
        });
    }
    
    // Hover pulse effect
    addHoverPulse(element) {
        if (typeof gsap === 'undefined') return;
        
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();

