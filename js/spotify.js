// Spotify Integration System - Using Embeds and Public API
class SpotifyManager {
    constructor() {
        this.currentPlaylist = null;
        this.tracks = [];
        this.currentPreview = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadPlaylist(CONFIG.spotify.defaultPlaylistId || '37i9dQZEVXdhFpNs4gXkQ5');
    }
    
    setupEventListeners() {
        // Event listeners for Spotify features
    }
    
    // Load a Spotify playlist
    async loadPlaylist(playlistId) {
        try {
            // Create embed iframe
            this.createPlaylistEmbed(playlistId);
            
            // Fetch playlist tracks using public API (no auth needed for public playlists)
            await this.fetchPlaylistTracks(playlistId);
        } catch (error) {
            console.error('Error loading playlist:', error);
        }
    }
    
    // Create Spotify embed iframe
    createPlaylistEmbed(playlistId) {
        const embedContainer = document.getElementById('spotifyEmbedContainer');
        if (!embedContainer) return;
        
        embedContainer.innerHTML = `
            <iframe 
                data-testid="embed-iframe" 
                style="border-radius:12px" 
                src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
        `;
    }
    
    // Fetch playlist tracks (using public API endpoint)
    async fetchPlaylistTracks(playlistId) {
        try {
            // Use Spotify's public oEmbed endpoint to get playlist info
            // Then use a CORS proxy or backend to get track details
            const response = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/${playlistId}`);
            const data = await response.json();
            
            // For track details, we'll use a backend endpoint or CORS proxy
            // For now, let's use a mock approach or fetch from a public API
            await this.fetchTracksWithPreview(playlistId);
        } catch (error) {
            console.error('Error fetching playlist tracks:', error);
            // Fallback: use sample tracks from config
            this.displayTracksFromConfig();
        }
    }
    
    // Fetch tracks with preview URLs using Spotify Web API (public endpoint via proxy)
    async fetchTracksWithPreview(playlistId) {
        try {
            // Try to fetch via backend proxy (if available)
            const response = await fetch(`/api/spotify/playlist/${playlistId}`);
            
            if (response.ok) {
                const data = await response.json();
                this.tracks = data.tracks || [];
                this.displayTracks();
            } else {
                // Fallback to config tracks
                this.displayTracksFromConfig();
            }
        } catch (error) {
            console.log('Using fallback tracks from config');
            this.displayTracksFromConfig();
        }
    }
    
    // Display tracks from config (fallback)
    displayTracksFromConfig() {
        const tracks = CONFIG.spotify.tracks || [];
        this.tracks = tracks;
        this.displayTracks();
    }
    
    // Display tracks in treasure grid
    displayTracks() {
        const grid = document.getElementById('treasureGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.tracks.forEach((track, index) => {
            const card = this.createTrackCard(track);
            grid.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                animationManager.revealTreasure(card);
            }, index * 100);
        });
        
    }
    
    // Create track card with image and hover preview
    createTrackCard(track) {
        const card = document.createElement('div');
        card.className = 'treasure-card track-card';
        card.dataset.trackId = track.id;
        card.dataset.previewUrl = track.preview_url || '';
        
        const imageUrl = track.album?.images?.[0]?.url || track.image || 'https://via.placeholder.com/300';
        const artistImage = track.artists?.[0]?.images?.[0]?.url || track.artistImage || imageUrl;
        
        card.innerHTML = `
            <div class="track-image-container">
                <img src="${imageUrl}" alt="${track.name}" class="treasure-image track-image">
                <div class="artist-overlay">
                    <img src="${artistImage}" alt="${track.artists?.[0]?.name || 'Artist'}" class="artist-image">
                </div>
                <div class="play-preview-icon">▶</div>
            </div>
            <h4 class="treasure-name">${track.name}</h4>
            <p class="treasure-details">${this.getArtistNames(track)}</p>
            ${track.album ? `<p class="treasure-details album-name">${track.album.name}</p>` : ''}
        `;
        
        // Hover preview functionality
        card.addEventListener('mouseenter', () => {
            this.playPreview(track.preview_url, card);
            card.classList.add('playing');
        });
        
        card.addEventListener('mouseleave', () => {
            this.stopPreview();
            card.classList.remove('playing');
        });
        
        // Click to open in Spotify
        card.addEventListener('click', () => {
            if (track.external_urls?.spotify) {
                window.open(track.external_urls.spotify, '_blank');
            } else if (track.spotify_url) {
                window.open(track.spotify_url, '_blank');
            }
        });
        
        return card;
    }
    
    // Get artist names as string
    getArtistNames(track) {
        if (track.artists && Array.isArray(track.artists)) {
            return track.artists.map(a => a.name).join(', ');
        }
        return track.artist || 'Unknown Artist';
    }
    
    // Play preview on hover
    playPreview(previewUrl, cardElement) {
        if (!previewUrl) {
            // Try to fetch preview URL if not available
            this.fetchPreviewForTrack(cardElement.dataset.trackId, cardElement);
            return;
        }
        
        // Stop any currently playing preview
        this.stopPreview();
        
        // Create and play audio
        const audio = new Audio(previewUrl);
        audio.volume = 0.4;
        audio.loop = false;
        
        audio.play().catch(err => {
            console.log('Preview play failed:', err);
            // Show visual feedback that preview isn't available
            cardElement.classList.add('no-preview');
        });
        
        this.currentPreview = audio;
        
        // Auto-stop after 30 seconds (typical preview length)
        setTimeout(() => {
            if (this.currentPreview === audio) {
                this.stopPreview();
            }
        }, 30000);
    }
    
    // Fetch preview URL for a track (via backend proxy)
    async fetchPreviewForTrack(trackId, cardElement) {
        try {
            const response = await fetch(`/api/spotify/track/${trackId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.preview_url) {
                    cardElement.dataset.previewUrl = data.preview_url;
                    this.playPreview(data.preview_url, cardElement);
                }
            }
        } catch (error) {
            console.log('Could not fetch preview URL');
        }
    }
    
    // Stop current preview
    stopPreview() {
        if (this.currentPreview) {
            this.currentPreview.pause();
            this.currentPreview.currentTime = 0;
            this.currentPreview = null;
        }
        
        // Remove playing class from all cards
        document.querySelectorAll('.track-card.playing').forEach(card => {
            card.classList.remove('playing');
        });
    }
    
}

// Initialize Spotify manager
const spotifyManager = new SpotifyManager();
