# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Spotify Playlist (Simple!)

The embed player works **without any API setup**! Just:

1. **Get your Spotify Playlist ID**:
   - Open Spotify and go to your playlist
   - Click the "..." menu → Share → Copy link to playlist
   - The ID is the part after `/playlist/` in the URL
   - Example: `https://open.spotify.com/playlist/37i9dQZEVXdhFpNs4gXkQ5`
   - The ID is: `37i9dQZEVXdhFpNs4gXkQ5`

2. **Update `js/config.js`**:
   ```javascript
   spotify: {
       defaultPlaylistId: 'YOUR_PLAYLIST_ID_HERE',
       tracks: [
           // Add tracks here (optional - see Step 3)
       ]
   }
   ```

## Step 3: Add Tracks for Hover Previews (Optional)

For hover previews to work, add tracks to `js/config.js`:

1. See `CONFIG_EXAMPLE.js` for the track structure
2. Add tracks with `preview_url`, images, and artist info
3. Or set up backend API (see Step 4) for automatic fetching

## Step 4: Backend API Setup (Optional - for auto track fetching)

Only needed if you want the backend to automatically fetch track data:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in app details and save
4. Copy your **Client ID** and **Client Secret**

5. Create a `.env` file:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   PORT=3000
   ```

## Step 5: Customize Your Content

Edit `js/config.js` to add your personal information:

- **Bio**: Name, age, interests, backstory
- **Photos**: Add photo paths and descriptions
- **Projects**: Add your projects (can be locked for mini-game)
- **Collages**: Add collage elements
- **Social Links**: Add your social media links

## Step 6: Run the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## Step 7: Open in Browser

Navigate to: `http://localhost:3000`

## Troubleshooting

### Playlist Embed Not Showing
- Make sure the playlist is **public** on Spotify
- Check that the playlist ID is correct in `config.js`
- Verify the playlist exists and is accessible

### Hover Previews Not Playing
- Add tracks to `CONFIG.spotify.tracks` with `preview_url`
- Or set up backend API (Step 4) for automatic fetching
- Some tracks don't have preview URLs available

### "Cannot GET /api/spotify/playlist"
- This is optional! The embed player works without it
- If you want auto-fetching, set up `.env` with Spotify credentials (Step 4)

### Audio Not Playing
- Browser autoplay policies may block audio
- Click the "Music" button to enable
- Add audio files to `audio/` directory and update `config.js`

### Animations Not Working
- Open browser console (F12) to check for errors
- Ensure all script files are loading correctly
- Check that GSAP library is loaded

## Next Steps

- Add your photos to `images/` directory
- Customize colors in `styles/main.css` (CSS variables)
- Add background music files to `audio/` directory
- Add tracks with preview URLs for hover functionality
- Deploy to production

## Quick Start (Minimal Setup)

If you just want to see it work quickly:

1. `npm install`
2. Update `defaultPlaylistId` in `js/config.js` with any public Spotify playlist
3. `npm start`
4. Open `http://localhost:3000`

That's it! The embed player will work immediately. Add tracks later for hover previews.
