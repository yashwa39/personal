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
    
    // Tarot card interactions
    setupTarotCards() {
        const drawBtn = document.getElementById('drawCards');
        const spread = document.getElementById('tarotSpread');
        const reading = document.getElementById('readingText');
        
        if (!drawBtn || !spread) return;
        
        const tarotCards = [
            { name: 'The Fool', icon: '🃏', meaning: 'New beginnings, innocence' },
            { name: 'The Magician', icon: '🎩', meaning: 'Manifestation, resourcefulness' },
            { name: 'The High Priestess', icon: '🌙', meaning: 'Intuition, mystery' },
            { name: 'The Empress', icon: '👑', meaning: 'Abundance, nurturing' },
            { name: 'The Emperor', icon: '⚔️', meaning: 'Authority, structure' },
            { name: 'The Lovers', icon: '💑', meaning: 'Love, harmony' },
            { name: 'The Chariot', icon: '🏎️', meaning: 'Control, determination' },
            { name: 'Strength', icon: '💪', meaning: 'Courage, inner strength' },
            { name: 'The Hermit', icon: '🕯️', meaning: 'Introspection, guidance' },
            { name: 'Wheel of Fortune', icon: '🎡', meaning: 'Cycles, change' }
        ];
        
        drawBtn.addEventListener('click', () => {
            audioManager.playClickSound();
            spread.innerHTML = '';
            
            // Draw 3 random cards
            const drawnCards = [];
            for (let i = 0; i < 3; i++) {
                const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
                drawnCards.push(randomCard);
                
                const card = document.createElement('div');
                card.className = 'tarot-card';
                card.innerHTML = `
                    <div class="tarot-card-front">
                        <div class="tarot-icon">${randomCard.icon}</div>
                    </div>
                    <div class="tarot-card-back">
                        <div class="tarot-name">${randomCard.name}</div>
                        <p style="font-size: 0.8rem; margin-top: 10px;">${randomCard.meaning}</p>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    audioManager.playEffect('cardFlip');
                    animationManager.flipCard(card);
                });
                
                spread.appendChild(card);
                
                // Stagger animation
                setTimeout(() => {
                    animationManager.revealTreasure(card);
                }, i * 200);
            }
            
        // Generate reading based on cards and Spotify data
        if (reading) {
            const bio = (typeof contentManager !== 'undefined' && contentManager.content) 
                ? contentManager.content.bio 
                : CONFIG.content.bio;
            reading.textContent = drawnCards.map(c => c.meaning).join(' | ') + 
                ` | Your persona: ${bio.name}`;
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
    
    // Fusion game - drag artists to slots (using tracks)
    setupFusionGame() {
        const slots = document.querySelectorAll('.fusion-slot');
        const tracks = spotifyManager.tracks || [];
        
        if (tracks.length === 0) return;
        
        // Extract unique artists from tracks
        const artistsMap = new Map();
        tracks.forEach(track => {
            const artistName = track.artists?.[0]?.name || track.artist || 'Unknown Artist';
            if (!artistsMap.has(artistName)) {
                artistsMap.set(artistName, {
                    name: artistName,
                    image: track.artistImage || track.album?.images?.[0]?.url
                });
            }
        });
        
        const artists = Array.from(artistsMap.values()).slice(0, 10);
        
        if (artists.length === 0) return;
        
        // Create draggable artist cards
        const artistContainer = document.createElement('div');
        artistContainer.className = 'artist-selector';
        artistContainer.style.display = 'flex';
        artistContainer.style.flexWrap = 'wrap';
        artistContainer.style.gap = '10px';
        artistContainer.style.marginBottom = '20px';
        artistContainer.style.justifyContent = 'center';
        
        artists.forEach(artist => {
            const card = document.createElement('div');
            card.className = 'artist-card';
            card.draggable = true;
            card.dataset.artistName = artist.name;
            
            if (artist.image) {
                card.innerHTML = `<img src="${artist.image}" alt="${artist.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-bottom: 5px;"><br>${artist.name}`;
            } else {
                card.textContent = artist.name;
            }
            
            card.style.padding = '10px';
            card.style.background = 'var(--card-bg)';
            card.style.border = '2px solid var(--electric-blue)';
            card.style.borderRadius = '8px';
            card.style.cursor = 'grab';
            card.style.textAlign = 'center';
            card.style.fontSize = '0.9rem';
            
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('artist', artist.name);
            });
            
            artistContainer.appendChild(card);
        });
        
        const fusionArea = document.getElementById('fusionArea');
        if (fusionArea && fusionArea.parentElement) {
            fusionArea.parentElement.insertBefore(artistContainer, fusionArea);
        }
        
        slots.forEach(slot => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.style.borderColor = 'var(--gold)';
            });
            
            slot.addEventListener('dragleave', () => {
                slot.style.borderColor = 'var(--electric-blue)';
            });
            
            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const artistName = e.dataTransfer.getData('artist');
                if (artistName) {
                    slot.textContent = artistName;
                    slot.classList.add('filled');
                    slot.dataset.artist = artistName;
                    slot.style.borderColor = 'var(--gold)';
                    audioManager.playClickSound();
                }
            });
        });
    }
}

// Initialize interaction manager
const interactionManager = new InteractionManager();

