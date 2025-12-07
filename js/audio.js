// Audio Management System
class AudioManager {
    constructor() {
        this.backgroundMusic = null;
        this.soundEffects = {};
        this.musicEnabled = CONFIG.audio.backgroundMusic.enabled;
        this.sfxEnabled = CONFIG.audio.soundEffects.enabled;
        this.init();
    }
    
    init() {
        // Initialize Howler.js for audio
        if (typeof Howl !== 'undefined') {
            // Background music setup
            if (CONFIG.audio.backgroundMusic.tracks.length > 0) {
                this.backgroundMusic = new Howl({
                    src: CONFIG.audio.backgroundMusic.tracks,
                    loop: true,
                    volume: CONFIG.audio.backgroundMusic.volume,
                    autoplay: false
                });
            }
            
            // Sound effects setup
            Object.keys(CONFIG.audio.soundEffects.effects).forEach(key => {
                const effectPath = CONFIG.audio.soundEffects.effects[key];
                if (effectPath) {
                    this.soundEffects[key] = new Howl({
                        src: [effectPath],
                        volume: CONFIG.audio.soundEffects.volume
                    });
                }
            });
        }
    }
    
    playMusic() {
        if (this.musicEnabled && this.backgroundMusic) {
            this.backgroundMusic.play();
        }
    }
    
    stopMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
    }
    
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (this.musicEnabled) {
            this.playMusic();
        } else {
            this.stopMusic();
        }
        return this.musicEnabled;
    }
    
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        return this.sfxEnabled;
    }
    
    playEffect(effectName) {
        if (this.sfxEnabled && this.soundEffects[effectName]) {
            this.soundEffects[effectName].play();
        }
    }
    
    // Fallback audio effects using Web Audio API if Howler not available
    playClickSound() {
        if (!this.sfxEnabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    playHoverSound() {
        if (!this.sfxEnabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// Initialize audio manager
const audioManager = new AudioManager();

