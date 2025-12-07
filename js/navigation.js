// Navigation System
class NavigationManager {
    constructor() {
        this.currentSection = 'entrance';
        this.init();
    }
    
    init() {
        // Set up navigation icons
        const denIcons = document.querySelectorAll('.den-icon');
        denIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
            
            // Add hover sound
            icon.addEventListener('mouseenter', () => {
                audioManager.playHoverSound();
            });
        });
        
        // Set up CTA button
        const enterBtn = document.getElementById('enterPalace');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                this.navigateToSection('projects'); // Navigate to Inventory
            });
        }
        
        // Set up replay button
        const replayBtn = document.getElementById('replayBtn');
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                this.navigateToSection('entrance');
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }
    
    navigateToSection(sectionId) {
        if (this.currentSection === sectionId) return;
        
        audioManager.playClickSound();
        animationManager.transitionToSection(sectionId);
        this.currentSection = sectionId;
        
        // Update active icon
        const denIcons = document.querySelectorAll('.den-icon');
        denIcons.forEach(icon => {
            if (icon.dataset.section === sectionId) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Load section-specific content
        this.loadSectionContent(sectionId);
    }
    
    loadSectionContent(sectionId) {
        switch(sectionId) {
            case 'music':
                // Spotify content is loaded automatically
                // Tracks are loaded on init
                break;
            case 'photos':
                this.loadPhotos();
                break;
            case 'projects':
                this.loadProjects();
                break;
            case 'collage':
                this.loadCollage();
                break;
            case 'velvet':
                // Gear & Tools content is static
                break;
            case 'friends':
                this.loadFriendsList();
                break;
            case 'settings':
                // Settings content is static
                break;
        }
    }
    
    loadFriendsList() {
        const socialLinksDiv = document.getElementById('socialLinks');
        if (!socialLinksDiv) return;
        
        // Clear if already loaded (unless in edit mode)
        if (socialLinksDiv.children.length > 0 && typeof contentManager !== 'undefined' && !contentManager.isEditMode) {
            return;
        }
        
        const socialLinks = (typeof contentManager !== 'undefined' && contentManager.content) 
            ? contentManager.content.socialLinks 
            : CONFIG.content.socialLinks;
        
        if (socialLinks.length === 0) {
            socialLinksDiv.innerHTML = '<p style="text-align: center; opacity: 0.7; padding: 2rem;">No social links available yet. Add links in Resource Pack Creator.</p>';
            return;
        }
        
        socialLinksDiv.innerHTML = '';
        socialLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.className = 'social-link';
            linkElement.textContent = link.name;
            socialLinksDiv.appendChild(linkElement);
        });
    }
    
    loadPhotos() {
        const grid = document.getElementById('photoGrid');
        if (!grid) return;
        
        // Clear grid if reloading
        if (grid.children.length > 0 && typeof contentManager !== 'undefined' && contentManager.isEditMode) {
            grid.innerHTML = '';
        } else if (grid.children.length > 0) {
            return;
        }
        
        const photos = (typeof contentManager !== 'undefined' && contentManager.content) 
            ? contentManager.content.photos 
            : CONFIG.content.photos;
        
        if (photos.length === 0) {
            grid.innerHTML = '<p style="text-align: center; opacity: 0.7;">No photos available yet. Add photos in config.js</p>';
            return;
        }
        
        photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'photo-item';
            item.innerHTML = `
                <img src="${photo.src}" alt="${photo.title}">
                <div class="photo-overlay">
                    <h4>${photo.title}</h4>
                    <p>${photo.description || ''}</p>
                </div>
            `;
            
            item.addEventListener('click', () => {
                this.openPhotoModal(photo);
            });
            
            grid.appendChild(item);
        });
        
        animationManager.staggerGridItems('.photo-item');
    }
    
    openPhotoModal(photo) {
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        const photoTitle = document.getElementById('photoTitle');
        const photoDescription = document.getElementById('photoDescription');
        
        if (modal && modalImage) {
            modalImage.src = photo.src;
            if (photoTitle) photoTitle.textContent = photo.title;
            if (photoDescription) photoDescription.textContent = photo.description || '';
            modal.classList.remove('hidden');
            
            audioManager.playClickSound();
            animationManager.createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);
        }
        
        const closeBtn = modal?.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            }, { once: true });
        }
    }
    
    loadProjects() {
        const grid = document.getElementById('projectGrid');
        if (!grid) return;
        
        // Clear grid if reloading
        if (grid.children.length > 0 && typeof contentManager !== 'undefined' && contentManager.isEditMode) {
            grid.innerHTML = '';
        } else if (grid.children.length > 0) {
            return;
        }
        
        const projects = (typeof contentManager !== 'undefined' && contentManager.content) 
            ? contentManager.content.projects 
            : CONFIG.content.projects;
        
        if (projects.length === 0) {
            grid.innerHTML = '<p style="text-align: center; opacity: 0.7;">No projects available yet. Add projects in config.js</p>';
            return;
        }
        
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.projectIndex = index;
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description || ''}</p>
                ${project.link ? '<span class="project-link-indicator">→</span>' : ''}
            `;
            
            if (project.link) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    window.open(project.link, '_blank');
                });
            }
            
            grid.appendChild(card);
        });
        
        animationManager.staggerGridItems('.project-card');
    }
    
    loadCollage() {
        const canvas = document.getElementById('collageCanvas');
        if (!canvas) return;
        
        // Initialize drag and drop for collage elements
        this.initCollageDragDrop();
    }
    
    initCollageDragDrop() {
        const canvas = document.getElementById('collageCanvas');
        if (!canvas) return;
        
        // Add sample collage elements from config
        const collages = (typeof contentManager !== 'undefined' && contentManager.content) 
            ? contentManager.content.collages 
            : CONFIG.content.collages;
        
        collages.forEach((collage, index) => {
            const element = document.createElement('div');
            element.className = 'collage-element';
            element.style.left = collage.x || (Math.random() * 50 + 25) + '%';
            element.style.top = collage.y || (Math.random() * 50 + 25) + '%';
            element.style.width = collage.width || '150px';
            element.style.height = collage.height || '150px';
            element.innerHTML = `<img src="${collage.src}" alt="Collage element">`;
            
            this.makeDraggable(element);
            canvas.appendChild(element);
        });
        
        // Upload button
        const uploadBtn = document.getElementById('uploadBtn');
        const uploadInput = document.getElementById('uploadImage');
        
        if (uploadBtn && uploadInput) {
            uploadBtn.addEventListener('click', () => {
                uploadInput.click();
            });
            
            uploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const element = document.createElement('div');
                        element.className = 'collage-element';
                        element.style.left = '50%';
                        element.style.top = '50%';
                        element.style.width = '150px';
                        element.style.height = '150px';
                        element.innerHTML = `<img src="${event.target.result}" alt="Uploaded image">`;
                        this.makeDraggable(element);
                        canvas.appendChild(element);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Save button
        const saveBtn = document.getElementById('saveCollage');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCollage();
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('resetCollage');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                canvas.innerHTML = '';
                this.loadCollage();
            });
        }
    }
    
    makeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            initialX = e.clientX - element.offsetLeft;
            initialY = e.clientY - element.offsetTop;
            element.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            const canvas = element.parentElement;
            const maxX = canvas.offsetWidth - element.offsetWidth;
            const maxY = canvas.offsetHeight - element.offsetHeight;
            
            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));
            
            element.style.left = currentX + 'px';
            element.style.top = currentY + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'move';
            }
        });
    }
    
    saveCollage() {
        const canvas = document.getElementById('collageCanvas');
        if (!canvas) return;
        
        // Create a seal animation
        animationManager.createParticleBurst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            '#FFD700'
        );
        
        audioManager.playEffect('unlock');
        alert('Collage sealed! (In a full implementation, this would save/download the collage)');
    }
    
    closeModals() {
        const modals = document.querySelectorAll('.photo-modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }
}

// Initialize navigation manager
const navigationManager = new NavigationManager();

