// Main Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
    console.log('Phantom Thief\'s Den - Initializing...');
    
    // Initialize all systems
    init();
});

function init() {
    // Hide loading screen after a short delay
    setTimeout(() => {
        animationManager.hideLoadingScreen();
        audioManager.playMusic();
    }, 1500);
    
    // Set up audio controls
    setupAudioControls();
    
    // Initialize entrance animation
    setTimeout(() => {
        animationManager.animateEntrance();
    }, 500);
    
    // Set up mask interaction
    setupMaskClick();
    
    // Initialize scroll animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.section').forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    // Add parallax or other scroll effects
                }
            });
        });
    }
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    console.log('Phantom Thief\'s Den - Ready!');
}

function setupAudioControls() {
    const musicToggle = document.getElementById('musicToggle');
    const sfxToggle = document.getElementById('sfxToggle');
    
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            const enabled = audioManager.toggleMusic();
            musicToggle.querySelector('.audio-label').textContent = enabled ? 'Music ON' : 'Music OFF';
        });
    }
    
    if (sfxToggle) {
        sfxToggle.addEventListener('click', () => {
            const enabled = audioManager.toggleSFX();
            sfxToggle.querySelector('.audio-label').textContent = enabled ? 'SFX ON' : 'SFX OFF';
        });
    }
}

function setupMaskClick() {
    const mask = document.getElementById('phantomMask');
    if (mask) {
        mask.addEventListener('click', () => {
            // Additional mask click effects
            gsap.to(mask, {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        audioManager.stopMusic();
    } else {
        if (audioManager.musicEnabled) {
            audioManager.playMusic();
        }
    }
});

