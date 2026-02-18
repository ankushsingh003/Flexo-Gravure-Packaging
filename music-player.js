/**
 * Floating Music Player - Flexoverse
 * Handles background music playback with persistence across pages.
 */

const tracks = [
    {
        name: "Nature's Whispering",
        artist: "Flexoverse Ambient",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        icon: "fa-leaf"
    },
    {
        name: "Deep Meditation",
        artist: "Zen Horizons",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        icon: "fa-om"
    },
    {
        name: "Soft Piano Dreams",
        artist: "Melodic Waves",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        icon: "fa-music"
    },
    {
        name: "Oceanic Tranquility",
        artist: "Blue Earth",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        icon: "fa-water"
    }
];

class MusicPlayer {
    constructor() {
        this.currentTrackIndex = parseInt(localStorage.getItem('flexo_music_track')) || 0;
        this.isPlaying = localStorage.getItem('flexo_music_playing') === 'true';
        this.volume = parseFloat(localStorage.getItem('flexo_music_volume')) || 0.5;
        this.audio = new Audio();
        this.audio.loop = true;
        this.audio.volume = this.volume;

        this.init();
    }

    init() {
        this.createUI();
        this.setupEventListeners();
        this.loadTrack(this.currentTrackIndex);

        // Auto-play if was playing before
        if (this.isPlaying) {
            this.play();
        }
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'music-player-container';
        container.innerHTML = `
            <div class="music-player-card" id="musicPlayerCard">
                <div class="player-header">
                    <h4 class="player-title"><i class="fas fa-headphones"></i> Soothing Vibes</h4>
                    <button class="close-player" id="hidePlayer"><i class="fas fa-times"></i></button>
                </div>
                <div class="track-info">
                    <div class="track-name" id="currentTrackName">Track Name</div>
                    <div class="track-artist" id="currentTrackArtist">Artist Name</div>
                </div>
                <div class="controls">
                    <button class="control-btn" id="prevTrack"><i class="fas fa-step-backward"></i></button>
                    <button class="control-btn play-pause-btn" id="playPauseBtn"><i class="fas fa-play"></i></button>
                    <button class="control-btn" id="nextTrack"><i class="fas fa-step-forward"></i></button>
                </div>
                <div class="volume-container">
                    <i class="fas fa-volume-up" id="volumeIcon"></i>
                    <input type="range" class="volume-slider" id="volumeSlider" min="0" max="1" step="0.01" value="${this.volume}">
                </div>
                <div class="track-list" id="trackListContainer">
                    <!-- Tracks will be injected here -->
                </div>
            </div>
            <div class="toggle-music-btn" id="togglePlayerBtn" title="Background Music">
                <i class="fas fa-music"></i>
            </div>
        `;
        document.body.appendChild(container);

        // Inject track list
        const trackList = document.getElementById('trackListContainer');
        tracks.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `track-item ${index === this.currentTrackIndex ? 'active' : ''}`;
            item.innerHTML = `<i class="fas ${track.icon}"></i> <span>${track.name}</span>`;
            item.onclick = () => this.switchTrack(index);
            trackList.appendChild(item);
        });

        this.updateUI();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('togglePlayerBtn');
        const card = document.getElementById('musicPlayerCard');
        const hideBtn = document.getElementById('hidePlayer');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevBtn = document.getElementById('prevTrack');
        const nextBtn = document.getElementById('nextTrack');
        const volumeSlider = document.getElementById('volumeSlider');

        toggleBtn.addEventListener('click', () => {
            card.classList.toggle('show');
        });

        hideBtn.addEventListener('click', () => {
            card.classList.remove('show');
        });

        playPauseBtn.addEventListener('click', () => {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        });

        prevBtn.addEventListener('click', () => {
            this.switchTrack((this.currentTrackIndex - 1 + tracks.length) % tracks.length);
        });

        nextBtn.addEventListener('click', () => {
            this.switchTrack((this.currentTrackIndex + 1) % tracks.length);
        });

        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!card.contains(e.target) && !toggleBtn.contains(e.target) && card.classList.contains('show')) {
                card.classList.remove('show');
            }
        });
    }

    loadTrack(index) {
        this.currentTrackIndex = index;
        const track = tracks[index];
        this.audio.src = track.url;

        document.getElementById('currentTrackName').textContent = track.name;
        document.getElementById('currentTrackArtist').textContent = track.artist;

        // Update active state in list
        const items = document.querySelectorAll('.track-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        localStorage.setItem('flexo_music_track', index);
    }

    play() {
        this.audio.play().catch(err => {
            console.log("Auto-play blocked or error:", err);
            this.isPlaying = false;
            this.updateUI();
        });
        this.isPlaying = true;
        this.updateUI();
        localStorage.setItem('flexo_music_playing', 'true');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
        localStorage.setItem('flexo_music_playing', 'false');
    }

    switchTrack(index) {
        const wasPlaying = this.isPlaying;
        this.loadTrack(index);
        if (wasPlaying) {
            this.play();
        }
    }

    setVolume(value) {
        this.volume = value;
        this.audio.volume = value;
        localStorage.setItem('flexo_music_volume', value);

        const volumeIcon = document.getElementById('volumeIcon');
        if (value == 0) volumeIcon.className = 'fas fa-volume-mute';
        else if (value < 0.5) volumeIcon.className = 'fas fa-volume-down';
        else volumeIcon.className = 'fas fa-volume-up';
    }

    updateUI() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const toggleBtn = document.getElementById('togglePlayerBtn');

        if (this.isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            toggleBtn.classList.add('playing-animation');
            toggleBtn.classList.add('active');
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            toggleBtn.classList.remove('playing-animation');
            toggleBtn.classList.remove('active');
        }
    }
}

// Initialize player when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MusicPlayer());
} else {
    new MusicPlayer();
}
