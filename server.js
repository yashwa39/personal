// Express Server for Spotify OAuth
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Spotify OAuth Configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || `http://localhost:${PORT}/callback.html`;

// Exchange authorization code for access token
app.post('/api/spotify/token', async (req, res) => {
    try {
        const { code, redirectUri } = req.body;
        
        if (!code) {
            return res.status(400).json({ error: 'Authorization code required' });
        }
        
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', redirectUri || REDIRECT_URI);
        
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });
        
        res.json({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in
        });
    } catch (error) {
        console.error('Token exchange error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to exchange token',
            details: error.response?.data || error.message
        });
    }
});

// Refresh access token
app.post('/api/spotify/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token required' });
        }
        
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });
        
        res.json({
            access_token: response.data.access_token,
            expires_in: response.data.expires_in,
            refresh_token: response.data.refresh_token || refreshToken
        });
    } catch (error) {
        console.error('Token refresh error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to refresh token',
            details: error.response?.data || error.message
        });
    }
});

// Optional: Fetch playlist tracks (requires Spotify API credentials)
app.get('/api/spotify/playlist/:playlistId', async (req, res) => {
    try {
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
            return res.status(503).json({ error: 'Spotify API not configured' });
        }
        
        // Get access token using client credentials
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
                }
            }
        );
        
        const accessToken = tokenResponse.data.access_token;
        
        // Fetch playlist tracks
        const playlistResponse = await axios.get(
            `https://api.spotify.com/v1/playlists/${req.params.playlistId}/tracks`,
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
        );
        
        const tracks = playlistResponse.data.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artists: item.track.artists,
            album: item.track.album,
            preview_url: item.track.preview_url,
            external_urls: item.track.external_urls,
            image: item.track.album?.images?.[0]?.url,
            artistImage: item.track.artists?.[0]?.images?.[0]?.url
        }));
        
        res.json({ tracks });
    } catch (error) {
        console.error('Playlist fetch error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to fetch playlist',
            details: error.response?.data || error.message
        });
    }
});

// Optional: Fetch track preview URL
app.get('/api/spotify/track/:trackId', async (req, res) => {
    try {
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
            return res.status(503).json({ error: 'Spotify API not configured' });
        }
        
        // Get access token
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
                }
            }
        );
        
        const accessToken = tokenResponse.data.access_token;
        
        // Fetch track
        const trackResponse = await axios.get(
            `https://api.spotify.com/v1/tracks/${req.params.trackId}`,
            {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            }
        );
        
        res.json({
            preview_url: trackResponse.data.preview_url,
            name: trackResponse.data.name,
            artists: trackResponse.data.artists
        });
    } catch (error) {
        console.error('Track fetch error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to fetch track',
            details: error.response?.data || error.message
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Phantom Thief's Den server running on http://localhost:${PORT}`);
    console.log(`📝 Make sure to set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env file`);
});

