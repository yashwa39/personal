// Interactive Elements and Mini-Games
class InteractionManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupMaskInteraction();
        this.setupTarotCards();
        this.setupContactForm();
        this.setupHoverEffects();
        this.setupScrollEffects();
        this.setupResourcePackButton();
    }
    
    setupResourcePackButton() {
        const openResourcePackBtn = document.getElementById('openResourcePack');
        if (openResourcePackBtn) {
            openResourcePackBtn.addEventListener('click', () => {
                if (typeof contentManager !== 'undefined') {
                    contentManager.toggleEditMode();
                    // Navigate to entrance section to see the edit interface
                    if (typeof navigationManager !== 'undefined') {
                        navigationManager.navigateToSection('entrance');
                    }
                }
            });
        }
    }
    
    // Mask click interaction
    setupMaskInteraction() {
        const mask = document.getElementById('phantomMask');
        const bioText = document.getElementById('bioText');
        
        if (!mask || !bioText) return;
        
        let revealed = false;
        
        mask.addEventListener('click', () => {
            audioManager.playClickSound();
            animationManager.createParticleBurst(
                mask.offsetLeft + mask.offsetWidth / 2,
                mask.offsetTop + mask.offsetHeight / 2
            );
            
            if (!revealed) {
                // Reveal bio
                const bio = CONFIG.content.bio;
                bioText.innerHTML = `
                    <strong>Name:</strong> ${bio.name}<br>
                    <strong>Age:</strong> ${bio.age}<br>
                    <strong>Interests:</strong> ${bio.interests.join(', ')}<br><br>
                    ${bio.backstory}
                `;
                
                // Animate mask crack
                mask.style.background = 'linear-gradient(135deg, #FF0000, #00BFFF)';
                mask.style.boxShadow = '0 0 50px rgba(255, 0, 0, 0.8)';
                
                revealed = true;
            } else {
                // Reset
                bioText.textContent = 'Click the mask to reveal more...';
                mask.style.background = 'linear-gradient(135deg, var(--electric-blue), var(--crimson-red))';
                mask.style.boxShadow = '';
                revealed = false;
            }
        });
    }
    
    // Tarot card interactions with real tarot deck
    setupTarotCards() {
        const drawBtn = document.getElementById('drawCards');
        const spread = document.getElementById('tarotSpread');
        const reading = document.getElementById('readingText');
        
        if (!drawBtn || !spread) return;
        
        drawBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            spread.innerHTML = '';
            
            if (typeof tarotReader === 'undefined') {
                console.error('Tarot reader not loaded');
                return;
            }
            
            // Draw 3 cards using real tarot deck
            const drawnCards = tarotReader.drawCards(3);
            
            drawnCards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'tarot-card';
                cardElement.dataset.cardId = card.id;
                cardElement.dataset.reversed = card.reversed;
                
                cardElement.innerHTML = `
                    <div class="tarot-card-front">
                        <img src="${card.image}" alt="${card.name}" class="tarot-card-image" onerror="this.src='https://via.placeholder.com/200x300/000000/FFFFFF?text=${encodeURIComponent(card.name)}'">
                        <div class="tarot-card-back-pattern"></div>
                    </div>
                    <div class="tarot-card-back">
                        <div class="tarot-card-back-content">
                            <h3 class="tarot-name">${card.name}</h3>
                            ${card.reversed ? '<span class="reversed-badge">REVERSED</span>' : ''}
                            <p class="tarot-meaning">${card.meaning}</p>
                            <p class="tarot-description">${card.description}</p>
                        </div>
                    </div>
                `;
                
                cardElement.addEventListener('click', () => {
                    audioManager.playEffect('cardFlip');
                    animationManager.flipCard(cardElement);
                });
                
                spread.appendChild(cardElement);
                
                // Stagger animation with Persona 5 style
                setTimeout(() => {
                    animationManager.revealTreasure(cardElement);
                    // Add dynamic entrance
                    if (typeof gsap !== 'undefined') {
                        gsap.from(cardElement, {
                            scale: 0,
                            rotation: card.reversed ? 180 : 0,
                            opacity: 0,
                            duration: 0.6,
                            delay: index * 0.2,
                            ease: 'back.out(1.7)'
                        });
                    }
                }, index * 200);
            });
            
            // Generate detailed reading
            if (reading && typeof tarotReader !== 'undefined') {
                const readingHTML = tarotReader.generateReading(drawnCards, 'threeCard');
                reading.innerHTML = readingHTML;
                
                // Animate reading appearance
                if (typeof gsap !== 'undefined') {
                    gsap.from(reading, {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                        delay: 0.6
                    });
                }
            }
        });
    }
    
    // Generate persona reading from tarot and Spotify
    generatePersonaReading(cards, readingElement) {
        const meanings = cards.map(c => c.meaning).join(', ');
        const topGenre = document.getElementById('topGenreStat')?.textContent || 'music';
        
        const reading = `
            Your cards reveal: ${meanings}
            <br><br>
            Your musical persona (${topGenre}) aligns with ${cards[0].name}, 
            suggesting a journey of ${cards[0].meaning.toLowerCase()}.
        `;
        
        readingElement.innerHTML = reading;
    }
    
    // Contact form
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            audioManager.playClickSound();
            animationManager.createParticleBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                '#FF0000'
            );
            
            // In a real implementation, send to backend
            alert('Your heart has been stolen! (Message would be sent in a full implementation)');
            form.reset();
        });
    }
    
    // Hover effects on interactive elements
    setupHoverEffects() {
        // Add hover effects to all interactive elements
        const interactiveElements = document.querySelectorAll(
            '.treasure-card, .project-card, .playlist-card, .photo-item, .den-icon, .cta-button'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                audioManager.playHoverSound();
                animationManager.addHoverPulse(element);
            });
            
            element.addEventListener('click', () => {
                audioManager.playClickSound();
            });
        });
    }
    
    // Scroll effects
    setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const scrollDiff = currentScroll - lastScroll;
            
            // Intensify rain on scroll
            const rainEffect = document.querySelector('.rain-effect');
            if (rainEffect) {
                const intensity = Math.min(1, Math.abs(scrollDiff) / 10);
                rainEffect.style.opacity = 0.1 + (intensity * 0.2);
            }
            
            lastScroll = currentScroll;
        });
    }
    
}

// Initialize interaction manager
const interactionManager = new InteractionManager();

