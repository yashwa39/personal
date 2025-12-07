// Configuration file for the Phantom Thief's Den
const CONFIG = {
    // Spotify Configuration - Using Embeds
    spotify: {
        // Default playlist ID (can be changed)
        defaultPlaylistId: '37i9dQZEVXdhFpNs4gXkQ5',
        
        // Sample tracks with preview URLs (add your own tracks here)
        // You can get track IDs and preview URLs from Spotify Web API or manually
        tracks: [
            // Example structure:
            // {
            //     id: 'track_id_here',
            //     name: 'Track Name',
            //     artist: 'Artist Name',
            //     artists: [{ name: 'Artist Name' }],
            //     album: { name: 'Album Name', images: [{ url: 'image_url' }] },
            //     image: 'album_cover_url',
            //     artistImage: 'artist_image_url',
            //     preview_url: 'https://p.scdn.co/mp3-preview/...',
            //     spotify_url: 'https://open.spotify.com/track/...',
            //     external_urls: { spotify: 'https://open.spotify.com/track/...' }
            // }
        ]
    },
    
    // Audio Configuration
    audio: {
        backgroundMusic: {
            enabled: true,
            volume: 0.3,
            tracks: [
                // Add your Persona 5 soundtrack URLs or local files
                // 'audio/persona5-theme.mp3'
            ]
        },
        soundEffects: {
            enabled: true,
            volume: 0.5,
            effects: {
                click: 'audio/sfx-click.mp3',
                hover: 'audio/sfx-hover.mp3',
                unlock: 'audio/sfx-unlock.mp3',
                cardFlip: 'audio/sfx-card-flip.mp3'
            }
        }
    },
    
    // Content Configuration (User can customize these)
    content: {
        bio: {
            name: 'Phantom Thief',
            age: 'Unknown',
            interests: ['Music', 'Art', 'Technology', 'Gaming'],
            backstory: 'A mysterious figure who steals hearts and showcases their palace to the world...',
            images: [] // Array of {url: 'image_url', caption: 'optional caption'}
        },
        photos: [
            // Add photo paths here
            // { src: 'images/photo1.jpg', title: 'Photo 1', description: 'Description' }
        ],
        projects: [
            // Add projects here
            // { title: 'Project 1', description: 'Description', link: '#', locked: true }
        ],
        collages: [
            // Add collage elements here
        ],
        socialLinks: [
            // { name: 'GitHub', url: 'https://github.com/username' }
        ]
    },
    
    // Animation Configuration
    animations: {
        duration: 0.3,
        easing: 'power2.out',
        stagger: 0.1
    },
    
    // Game Configuration
    game: {
        lockpickDifficulty: 0.15, // Range for successful unlock (0.15 = 15% tolerance)
        fusionEnabled: true
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

