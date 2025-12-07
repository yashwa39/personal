// Example configuration for adding tracks to js/config.js
// Copy this structure into CONFIG.spotify.tracks array

const EXAMPLE_TRACKS = [
    {
        id: '4cOdK2wGLETKBW3PvgPWqT', // Spotify track ID
        name: 'Take On Me',
        artist: 'a-ha',
        artists: [{ name: 'a-ha' }],
        album: {
            name: 'Hunting High and Low',
            images: [
                { url: 'https://i.scdn.co/image/ab67616d0000b273ba3e6f3e952f5b9c3b8e5e5e' }
            ]
        },
        image: 'https://i.scdn.co/image/ab67616d0000b273ba3e6f3e952f5b9c3b8e5e5e', // Album cover
        artistImage: 'https://i.scdn.co/image/ab67616d0000b273ba3e6f3e952f5b9c3b8e5e5e', // Artist image (optional)
        preview_url: 'https://p.scdn.co/mp3-preview/...', // 30-second preview URL
        spotify_url: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
        external_urls: {
            spotify: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'
        }
    },
    // Add more tracks following this structure...
];

// How to get track information:
// 1. Go to Spotify Web Player
// 2. Right-click on a track → Copy Song Link
// 3. The track ID is in the URL: spotify.com/track/TRACK_ID_HERE
// 4. Use Spotify Web API or a tool to get preview_url and images
// 5. Or use the optional backend endpoints in server.js (requires API credentials)

