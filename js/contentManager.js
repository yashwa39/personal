// Content Management System - Edit and Lock Features
class ContentManager {
    constructor() {
        this.isEditMode = false;
        this.isLocked = this.checkIfLocked();
        this.content = this.loadContent();
        this.init();
    }
    
    init() {
        this.setupEditButton();
        this.loadContentIntoUI();
        this.setupEditModals();
    }
    
    // Check if editing is permanently locked
    checkIfLocked() {
        return localStorage.getItem('editing_locked') === 'true';
    }
    
    // Load content from localStorage or use default from CONFIG
    loadContent() {
        const saved = localStorage.getItem('palace_content');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading saved content:', e);
            }
        }
        // Return default from CONFIG
        return JSON.parse(JSON.stringify(CONFIG.content));
    }
    
    // Save content to localStorage
    saveContent() {
        localStorage.setItem('palace_content', JSON.stringify(this.content));
    }
    
    // Toggle edit mode
    toggleEditMode() {
        if (this.isLocked) {
            alert('Editing has been permanently locked. Content cannot be modified.');
            return;
        }
        
        this.isEditMode = !this.isEditMode;
        document.body.classList.toggle('edit-mode', this.isEditMode);
        
        const editBtn = document.getElementById('editModeBtn');
        if (editBtn) {
            editBtn.textContent = this.isEditMode ? 'Exit Edit Mode' : 'Edit Content';
            editBtn.classList.toggle('active', this.isEditMode);
        }
        
        // Show/hide edit buttons and lock button
        document.querySelectorAll('.edit-section-btn').forEach(btn => {
            btn.style.display = this.isEditMode ? 'block' : 'none';
        });
        
        const lockBtn = document.getElementById('lockEditingBtn');
        if (lockBtn) {
            lockBtn.style.display = this.isEditMode ? 'flex' : 'none';
        }
        
        audioManager.playClickSound();
    }
    
    // Setup edit button
    setupEditButton() {
        // Create edit button if it doesn't exist
        if (!document.getElementById('editModeBtn')) {
            const editBtn = document.createElement('button');
            editBtn.id = 'editModeBtn';
            editBtn.className = 'edit-mode-btn';
            editBtn.textContent = 'Edit Content';
            editBtn.addEventListener('click', () => this.toggleEditMode());
            
            // Add to audio controls area
            const audioControls = document.querySelector('.audio-controls');
            if (audioControls) {
                audioControls.appendChild(editBtn);
            }
        }
        
        // Setup lock button
        const lockBtn = document.getElementById('lockEditingBtn');
        if (lockBtn) {
            lockBtn.addEventListener('click', () => this.lockEditing());
            // Only show when in edit mode and not locked
            lockBtn.style.display = (this.isEditMode && !this.isLocked) ? 'flex' : 'none';
        }
        
        // Don't show edit button if locked
        if (this.isLocked) {
            const editBtn = document.getElementById('editModeBtn');
            if (editBtn) editBtn.style.display = 'none';
        }
    }
    
    // Setup edit modals for each section
    setupEditModals() {
        this.setupBioEditor();
        this.setupPhotoEditor();
        this.setupProjectEditor();
        this.setupCollageEditor();
        this.setupSocialLinksEditor();
    }
    
    // Bio Editor
    setupBioEditor() {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-section-btn';
        editBtn.textContent = '✏️ Edit Bio';
        editBtn.style.display = 'none';
        editBtn.addEventListener('click', () => this.openBioEditor());
        
        const bioCard = document.querySelector('.bio-card');
        if (bioCard) {
            bioCard.style.position = 'relative';
            bioCard.appendChild(editBtn);
        }
    }
    
    openBioEditor() {
        const modal = this.createModal('Edit Bio', null);
        
        modal.innerHTML = `
            <div class="edit-form">
                <label>Name:</label>
                <input type="text" id="editBioName" value="${this.content.bio.name}" required>
                
                <label>Age:</label>
                <input type="text" id="editBioAge" value="${this.content.bio.age}" required>
                
                <label>Interests (comma-separated):</label>
                <input type="text" id="editBioInterests" value="${this.content.bio.interests.join(', ')}" required>
                
                <label>Backstory:</label>
                <textarea id="editBioBackstory" rows="5" required>${this.content.bio.backstory}</textarea>
                
                <div class="modal-buttons">
                    <button class="save-btn" onclick="contentManager.saveBio()">Save</button>
                    <button class="cancel-btn" onclick="contentManager.closeModal()">Cancel</button>
                </div>
            </div>
        `;
    }
    
    saveBio() {
        const name = document.getElementById('editBioName').value;
        const age = document.getElementById('editBioAge').value;
        const interests = document.getElementById('editBioInterests').value.split(',').map(i => i.trim()).filter(i => i);
        const backstory = document.getElementById('editBioBackstory').value;
        
        this.content.bio = { name, age, interests, backstory };
        this.saveContent();
        this.loadContentIntoUI();
        this.closeModal();
    }
    
    // Photo Editor
    setupPhotoEditor() {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-section-btn';
        editBtn.textContent = '✏️ Edit Photos';
        editBtn.style.display = 'none';
        editBtn.addEventListener('click', () => this.openPhotoEditor());
        
        const photosSection = document.getElementById('photos');
        if (photosSection) {
            const sectionTitle = photosSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.style.position = 'relative';
                sectionTitle.appendChild(editBtn);
            }
        }
    }
    
    openPhotoEditor() {
        const modal = this.createModal('Edit Photos', null);
        
        let photosHTML = '<div class="photos-list">';
        this.content.photos.forEach((photo, index) => {
            photosHTML += `
                <div class="photo-edit-item">
                    <img src="${photo.src}" alt="${photo.title}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
                    <div class="photo-edit-info">
                        <input type="text" value="${photo.title}" data-index="${index}" data-field="title" placeholder="Title">
                        <input type="text" value="${photo.description || ''}" data-index="${index}" data-field="description" placeholder="Description">
                        <input type="text" value="${photo.src}" data-index="${index}" data-field="src" placeholder="Image URL">
                        <button class="delete-btn" onclick="contentManager.deletePhoto(${index})">Delete</button>
                    </div>
                </div>
            `;
        });
        photosHTML += '</div>';
        
        modal.innerHTML = `
            ${photosHTML}
            <div class="add-photo-section">
                <h3>Add New Photo</h3>
                <input type="text" id="newPhotoSrc" placeholder="Image URL or path">
                <input type="text" id="newPhotoTitle" placeholder="Title">
                <textarea id="newPhotoDescription" placeholder="Description"></textarea>
                <button class="add-btn" onclick="contentManager.addPhoto()">Add Photo</button>
            </div>
            <div class="modal-buttons">
                <button class="save-btn" onclick="contentManager.savePhotos()">Save All</button>
                <button class="cancel-btn" onclick="contentManager.closeModal()">Cancel</button>
            </div>
        `;
        
        // Add real-time updates
        modal.querySelectorAll('input[data-field]').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                this.content.photos[index][field] = e.target.value;
            });
        });
    }
    
    addPhoto() {
        const src = document.getElementById('newPhotoSrc').value;
        const title = document.getElementById('newPhotoTitle').value;
        const description = document.getElementById('newPhotoDescription').value;
        
        if (!src || !title) {
            alert('Please provide at least an image URL and title');
            return;
        }
        
        this.content.photos.push({ src, title, description });
        this.openPhotoEditor(); // Refresh editor
    }
    
    deletePhoto(index) {
        if (confirm('Delete this photo?')) {
            this.content.photos.splice(index, 1);
            this.openPhotoEditor(); // Refresh editor
        }
    }
    
    savePhotos() {
        this.saveContent();
        this.loadContentIntoUI();
        this.closeModal();
    }
    
    // Project Editor
    setupProjectEditor() {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-section-btn';
        editBtn.textContent = '✏️ Edit Projects';
        editBtn.style.display = 'none';
        editBtn.addEventListener('click', () => this.openProjectEditor());
        
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const sectionTitle = projectsSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.style.position = 'relative';
                sectionTitle.appendChild(editBtn);
            }
        }
    }
    
    openProjectEditor() {
        const modal = this.createModal('Edit Projects', null);
        
        let projectsHTML = '<div class="projects-list">';
        this.content.projects.forEach((project, index) => {
            projectsHTML += `
                <div class="project-edit-item">
                    <input type="text" value="${project.title}" data-index="${index}" data-field="title" placeholder="Title">
                    <textarea data-index="${index}" data-field="description" placeholder="Description">${project.description || ''}</textarea>
                    <input type="text" value="${project.link || ''}" data-index="${index}" data-field="link" placeholder="Link URL">
                    <label>
                        <input type="checkbox" ${project.locked ? 'checked' : ''} data-index="${index}" data-field="locked"> Locked (requires mini-game)
                    </label>
                    <button class="delete-btn" onclick="contentManager.deleteProject(${index})">Delete</button>
                </div>
            `;
        });
        projectsHTML += '</div>';
        
        modal.innerHTML = `
            ${projectsHTML}
            <div class="add-project-section">
                <h3>Add New Project</h3>
                <input type="text" id="newProjectTitle" placeholder="Title">
                <textarea id="newProjectDescription" placeholder="Description"></textarea>
                <input type="text" id="newProjectLink" placeholder="Link URL">
                <label>
                    <input type="checkbox" id="newProjectLocked"> Locked
                </label>
                <button class="add-btn" onclick="contentManager.addProject()">Add Project</button>
            </div>
            <div class="modal-buttons">
                <button class="save-btn" onclick="contentManager.saveProjects()">Save All</button>
                <button class="cancel-btn" onclick="contentManager.closeModal()">Cancel</button>
            </div>
        `;
        
        // Add real-time updates
        modal.querySelectorAll('input[data-field], textarea[data-field]').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                if (e.target.type === 'checkbox') {
                    this.content.projects[index][field] = e.target.checked;
                } else {
                    this.content.projects[index][field] = e.target.value;
                }
            });
        });
    }
    
    addProject() {
        const title = document.getElementById('newProjectTitle').value;
        const description = document.getElementById('newProjectDescription').value;
        const link = document.getElementById('newProjectLink').value;
        const locked = document.getElementById('newProjectLocked').checked;
        
        if (!title) {
            alert('Please provide a title');
            return;
        }
        
        this.content.projects.push({ title, description, link, locked });
        this.openProjectEditor(); // Refresh editor
    }
    
    deleteProject(index) {
        if (confirm('Delete this project?')) {
            this.content.projects.splice(index, 1);
            this.openProjectEditor(); // Refresh editor
        }
    }
    
    saveProjects() {
        this.saveContent();
        this.loadContentIntoUI();
        this.closeModal();
    }
    
    // Collage Editor
    setupCollageEditor() {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-section-btn';
        editBtn.textContent = '✏️ Edit Collages';
        editBtn.style.display = 'none';
        editBtn.addEventListener('click', () => this.openCollageEditor());
        
        const collageSection = document.getElementById('collage');
        if (collageSection) {
            const sectionTitle = collageSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.style.position = 'relative';
                sectionTitle.appendChild(editBtn);
            }
        }
    }
    
    openCollageEditor() {
        const modal = this.createModal('Edit Collage Elements', null);
        
        let collagesHTML = '<div class="collages-list">';
        this.content.collages.forEach((collage, index) => {
            collagesHTML += `
                <div class="collage-edit-item">
                    <img src="${collage.src}" alt="Collage" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <input type="text" value="${collage.src}" data-index="${index}" data-field="src" placeholder="Image URL">
                    <input type="number" value="${collage.x || 25}" data-index="${index}" data-field="x" placeholder="X position (%)">
                    <input type="number" value="${collage.y || 25}" data-index="${index}" data-field="y" placeholder="Y position (%)">
                    <input type="number" value="${collage.width || 150}" data-index="${index}" data-field="width" placeholder="Width (px)">
                    <input type="number" value="${collage.height || 150}" data-index="${index}" data-field="height" placeholder="Height (px)">
                    <button class="delete-btn" onclick="contentManager.deleteCollage(${index})">Delete</button>
                </div>
            `;
        });
        collagesHTML += '</div>';
        
        modal.innerHTML = `
            ${collagesHTML}
            <div class="add-collage-section">
                <h3>Add New Collage Element</h3>
                <input type="text" id="newCollageSrc" placeholder="Image URL">
                <input type="number" id="newCollageX" placeholder="X position (%)" value="25">
                <input type="number" id="newCollageY" placeholder="Y position (%)" value="25">
                <input type="number" id="newCollageWidth" placeholder="Width (px)" value="150">
                <input type="number" id="newCollageHeight" placeholder="Height (px)" value="150">
                <button class="add-btn" onclick="contentManager.addCollage()">Add Element</button>
            </div>
            <div class="modal-buttons">
                <button class="save-btn" onclick="contentManager.saveCollages()">Save All</button>
                <button class="cancel-btn" onclick="contentManager.closeModal()">Cancel</button>
            </div>
        `;
        
        // Add real-time updates
        modal.querySelectorAll('input[data-field]').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
                this.content.collages[index][field] = value;
            });
        });
    }
    
    addCollage() {
        const src = document.getElementById('newCollageSrc').value;
        const x = parseFloat(document.getElementById('newCollageX').value) || 25;
        const y = parseFloat(document.getElementById('newCollageY').value) || 25;
        const width = parseFloat(document.getElementById('newCollageWidth').value) || 150;
        const height = parseFloat(document.getElementById('newCollageHeight').value) || 150;
        
        if (!src) {
            alert('Please provide an image URL');
            return;
        }
        
        this.content.collages.push({ src, x, y, width, height });
        this.openCollageEditor(); // Refresh editor
    }
    
    deleteCollage(index) {
        if (confirm('Delete this collage element?')) {
            this.content.collages.splice(index, 1);
            this.openCollageEditor(); // Refresh editor
        }
    }
    
    saveCollages() {
        this.saveContent();
        this.loadContentIntoUI();
        this.closeModal();
    }
    
    // Social Links Editor
    setupSocialLinksEditor() {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-section-btn';
        editBtn.textContent = '✏️ Edit Social Links';
        editBtn.style.display = 'none';
        editBtn.addEventListener('click', () => this.openSocialLinksEditor());
        
        const velvetSection = document.getElementById('velvet');
        if (velvetSection) {
            const socialLinksDiv = document.getElementById('socialLinks');
            if (socialLinksDiv) {
                socialLinksDiv.style.position = 'relative';
                socialLinksDiv.appendChild(editBtn);
            }
        }
    }
    
    openSocialLinksEditor() {
        const modal = this.createModal('Edit Social Links', null);
        
        let linksHTML = '<div class="links-list">';
        this.content.socialLinks.forEach((link, index) => {
            linksHTML += `
                <div class="link-edit-item">
                    <input type="text" value="${link.name}" data-index="${index}" data-field="name" placeholder="Name">
                    <input type="url" value="${link.url}" data-index="${index}" data-field="url" placeholder="URL">
                    <button class="delete-btn" onclick="contentManager.deleteSocialLink(${index})">Delete</button>
                </div>
            `;
        });
        linksHTML += '</div>';
        
        modal.innerHTML = `
            ${linksHTML}
            <div class="add-link-section">
                <h3>Add New Social Link</h3>
                <input type="text" id="newLinkName" placeholder="Name (e.g., GitHub)">
                <input type="url" id="newLinkUrl" placeholder="URL">
                <button class="add-btn" onclick="contentManager.addSocialLink()">Add Link</button>
            </div>
            <div class="modal-buttons">
                <button class="save-btn" onclick="contentManager.saveSocialLinks()">Save All</button>
                <button class="cancel-btn" onclick="contentManager.closeModal()">Cancel</button>
            </div>
        `;
        
        // Add real-time updates
        modal.querySelectorAll('input[data-field]').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const field = e.target.dataset.field;
                this.content.socialLinks[index][field] = e.target.value;
            });
        });
    }
    
    addSocialLink() {
        const name = document.getElementById('newLinkName').value;
        const url = document.getElementById('newLinkUrl').value;
        
        if (!name || !url) {
            alert('Please provide both name and URL');
            return;
        }
        
        this.content.socialLinks.push({ name, url });
        this.openSocialLinksEditor(); // Refresh editor
    }
    
    deleteSocialLink(index) {
        if (confirm('Delete this social link?')) {
            this.content.socialLinks.splice(index, 1);
            this.openSocialLinksEditor(); // Refresh editor
        }
    }
    
    saveSocialLinks() {
        this.saveContent();
        this.loadContentIntoUI();
        this.closeModal();
    }
    
    // Load content into UI
    loadContentIntoUI() {
        // Update bio
        const bioText = document.getElementById('bioText');
        if (bioText) {
            const bio = this.content.bio;
            bioText.innerHTML = `
                <strong>Name:</strong> ${bio.name}<br>
                <strong>Age:</strong> ${bio.age}<br>
                <strong>Interests:</strong> ${bio.interests.join(', ')}<br><br>
                ${bio.backstory}
            `;
        }
        
        // Update photos (handled by navigation manager)
        // Update projects (handled by navigation manager)
        // Update collages (handled by navigation manager)
        // Update social links
        const socialLinksDiv = document.getElementById('socialLinks');
        if (socialLinksDiv) {
            socialLinksDiv.innerHTML = '';
            this.content.socialLinks.forEach(link => {
                const linkEl = document.createElement('a');
                linkEl.href = link.url;
                linkEl.target = '_blank';
                linkEl.className = 'social-link';
                linkEl.textContent = link.name;
                socialLinksDiv.appendChild(linkEl);
            });
        }
        
        // Trigger navigation manager to reload sections
        if (typeof navigationManager !== 'undefined') {
            const currentSection = navigationManager.currentSection;
            // Clear grids before reloading
            const photoGrid = document.getElementById('photoGrid');
            const projectGrid = document.getElementById('projectGrid');
            if (photoGrid) photoGrid.innerHTML = '';
            if (projectGrid) projectGrid.innerHTML = '';
            navigationManager.loadSectionContent(currentSection);
        }
    }
    
    // Lock editing permanently
    lockEditing() {
        if (confirm('Are you sure you want to PERMANENTLY lock editing? This action cannot be undone. You will not be able to edit any content after this.')) {
            if (confirm('This is your last chance. Click OK to permanently lock editing.')) {
                localStorage.setItem('editing_locked', 'true');
                this.isLocked = true;
                this.isEditMode = false;
                document.body.classList.remove('edit-mode');
                
                const editBtn = document.getElementById('editModeBtn');
                if (editBtn) editBtn.style.display = 'none';
                
                document.querySelectorAll('.edit-section-btn').forEach(btn => {
                    btn.style.display = 'none';
                });
                
                const lockBtn = document.getElementById('lockEditingBtn');
                if (lockBtn) lockBtn.style.display = 'none';
                
                alert('Editing has been permanently locked. Content can no longer be modified.');
                audioManager.playEffect('unlock');
            }
        }
    }
    
    // Create modal
    createModal(title, onSave) {
        // Remove existing modal if any
        const existing = document.getElementById('editModal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.id = 'editModal';
        modal.className = 'edit-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'edit-modal-content';
        
        const header = document.createElement('div');
        header.className = 'edit-modal-header';
        header.innerHTML = `
            <h2>${title}</h2>
            <button class="modal-close" onclick="contentManager.closeModal()">&times;</button>
        `;
        
        modalContent.appendChild(header);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Store onSave callback
        modal.dataset.onSave = onSave ? 'true' : 'false';
        
        return modalContent;
    }
    
    closeModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.remove();
        }
    }
    
    saveFromModal() {
        // This will be called by inline onclick handlers
        // The specific save methods handle the actual saving
    }
}

// Initialize content manager
const contentManager = new ContentManager();

