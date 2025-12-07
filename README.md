# 🎭 Phantom Thief's Den - Persona 5-Inspired Personal Website

A highly interactive, immersive personal website inspired by Persona 5's aesthetic, featuring Spotify integration, dynamic animations, and gamified interactions.

![Persona 5 Style](https://img.shields.io/badge/Style-Persona%205-red?style=for-the-badge)
![Spotify Integration](https://img.shields.io/badge/Spotify-Integrated-green?style=for-the-badge)

## ✨ Features

### 🎨 Visual Design
- **Neon Aesthetic**: Electric blue (#00BFFF) and crimson red (#FF0000) color scheme
- **Dynamic Backgrounds**: Animated cityscape with rain effects and particle systems
- **Persona 5 UI Elements**: Holographic menus, glitchy text effects, and character silhouettes
- **Smooth Animations**: GSAP-powered 60fps animations throughout

### 🎵 Spotify Integration
- **Embed-Based**: Uses Spotify embed iframes (no OAuth required!)
- **Interactive Track Cards**: 
  - Hover to play 30-second previews
  - Beautiful album and artist images
  - Click to open in Spotify
- **Playlist Embed**: Full Spotify player embedded in the page
- **Interactive Features**:
  - Hover previews with visual feedback
  - Artist fusion mini-game
  - Track cards with album/artist images

### 🎮 Interactive Sections

1. **Entrance/Hub (The Awakening)**
   - Animated intro sequence
   - Clickable mask revealing personal bio
   - Social link previews

2. **Music Palace**
   - Spotify playlist embed player
   - Interactive track cards with hover previews
   - Album and artist images
   - Fusion game for combining artists

3. **Photo Gallery (The Shadows)**
   - Dark, high-contrast photo grid
   - Click-to-enlarge with steal animation
   - Drag-to-rearrange functionality

4. **Projects Showcase (The Heist)**
   - Lock-picking mini-game to unlock projects
   - Progress indicators
   - Vault-themed presentation

5. **Collage Creator (The Collective Unconscious)**
   - Drag-and-drop canvas
   - Upload custom images
   - Save/export functionality with seal animation

6. **Velvet Room**
   - Tarot card spreads
   - Persona readings based on Spotify data
   - Social links and resume

### 🔊 Audio System
- Background music support (Persona 5 soundtrack)
- Interactive sound effects (clicks, hovers, unlocks)
- Audio controls with toggle switches
- Web Audio API fallbacks

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- (Optional) Spotify Developer Account for advanced features

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd canvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Spotify (Optional - for track previews)**
   - The embed player works without any setup!
   - For hover previews, you can either:
     - Add tracks manually to `js/config.js` (see CONFIG_EXAMPLE.js)
     - Set up Spotify API credentials for automatic track fetching:
       - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
       - Create a new app and get Client ID/Secret
       - Add to `.env` file (optional)

4. **Customize your content**
   - Edit `js/config.js`:
     - Set `defaultPlaylistId` to your Spotify playlist ID
     - Add tracks to `tracks` array (see CONFIG_EXAMPLE.js)
     - Add bio, photos, projects, collages
     - Add social links

6. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
canvas/
├── index.html              # Main HTML file
├── server.js               # Express server for Spotify OAuth
├── callback.html           # OAuth callback page
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── styles/
│   └── main.css           # All Persona 5 styling
└── js/
    ├── config.js          # Configuration and content
    ├── main.js            # Main application entry
    ├── audio.js           # Audio management
    ├── animations.js      # GSAP animations
    ├── spotify.js         # Spotify API integration
    ├── navigation.js     # Navigation and routing
    └── interactions.js    # Interactive elements and mini-games
```

## 🎯 Customization Guide

### Adding Your Content

1. **Spotify Playlist** (`js/config.js`):
   ```javascript
   spotify: {
       defaultPlaylistId: '37i9dQZEVXdhFpNs4gXkQ5', // Your playlist ID
       tracks: [
           // Add tracks with preview URLs (see CONFIG_EXAMPLE.js)
       ]
   }
   ```

2. **Personal Bio** (`js/config.js`):
   ```javascript
   bio: {
       name: 'Your Name',
       age: 'Your Age',
       interests: ['Interest 1', 'Interest 2'],
       backstory: 'Your story...'
   }
   ```

3. **Photos**:
   ```javascript
   photos: [
       { 
           src: 'images/photo1.jpg', 
           title: 'Photo Title', 
           description: 'Description' 
       }
   ]
   ```

4. **Projects**:
   ```javascript
   projects: [
       { 
           title: 'Project Name', 
           description: 'Description', 
           link: 'https://...', 
           locked: true 
       }
   ]
   ```

### Styling Customization

Edit `styles/main.css` to customize:
- Colors (CSS variables in `:root`)
- Fonts (currently using Orbitron and Rajdhani)
- Animation timings
- Layout spacing

### Spotify Features

The Spotify integration:
- Embeds a full Spotify playlist player (no setup required!)
- Shows interactive track cards with hover previews
- Displays album and artist images
- Plays 30-second previews on hover
- Opens tracks in Spotify when clicked

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Animations**: GSAP (GreenSock Animation Platform)
- **Audio**: Howler.js + Web Audio API
- **Backend**: Node.js + Express
- **API**: Spotify Web API

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (with touch optimizations)

### Performance
- Optimized animations (60fps target)
- Lazy loading for images
- Cached API responses
- Reduced motion support for accessibility

## 🎮 Interactive Features Explained

### Lock-Picking Mini-Game
- Click on locked projects to start
- Align the slider with the target zone
- Success unlocks the project and reveals details

### Fusion Game
- Drag top artists into fusion slots
- Combine them to generate playlist concepts
- Visual feedback with particle effects

### Tarot Reading
- Draw 3 random cards
- Click cards to flip and reveal meanings
- Get persona insights based on Spotify data

## 🔒 Privacy & Security

- Spotify tokens stored locally (localStorage)
- No data shared publicly without consent
- OAuth flow handled securely via backend
- Option to logout and revoke access

## 📝 License

MIT License - Feel free to use and modify for your personal website!

## 🙏 Credits

- Inspired by Persona 5 (Atlus)
- Spotify Web API
- GSAP Animation Library
- Howler.js Audio Library

## 🐛 Troubleshooting

### Spotify Issues
- **Embed not showing**: Check that playlist ID is correct and playlist is public
- **Preview not playing**: Add `preview_url` to tracks in config, or set up backend API
- **No tracks showing**: Add tracks to `CONFIG.spotify.tracks` array (see CONFIG_EXAMPLE.js)

### Audio Not Playing
- Check browser autoplay policies
- Ensure audio files are in correct format (MP3 recommended)
- Check browser console for errors

### Animations Not Working
- Ensure GSAP library is loaded
- Check browser console for JavaScript errors
- Verify all script files are in correct order

## 🚧 Future Enhancements

- [ ] More mini-games
- [ ] Social sharing features
- [ ] Blog/journal section
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Advanced collage editing tools
- [ ] Real-time Spotify playback integration

## 📧 Contact

For questions or issues, please open an issue on GitHub or contact the developer.

---

**Take Your Heart!** ❤️

