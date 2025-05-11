let canvas;
let headline;
let startTheGame;
let gameSettings;
let impressumSite;
let fullscreenImg;
let bgMusic;
let volumeBtn;
let audioSettings;
let keyboardLayout;
let gameOverScreen;
let winScreen;
let world;
let mobileDevice;
let keyboard = new Keyboard();
let keyHandled = false;
let isFullscreen = false;
let savedVolume = localStorage.getItem('volume');
savedVolume = savedVolume !== null ? parseFloat(savedVolume) : 1;
let progressValue = savedVolume * 100;
let musicIsPlaying = false;

/**
 * Initializes the game elements and the start screen.
 */
function init() {
    getElements();
    initStartScreen();
}

/**
 * Clears all intervals that are currently set.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Handles the keydown event to track key presses and update the keyboard state.
 * 
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

    if (event.keyCode == 27) {
        keyboard.ESC = true;
        stopGame();
    }
});

/**
 * Handles the keyup event to track key releases and update the keyboard state.
 * 
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Pauses the background music when the boss fight starts.
 */
function startBossFight() {
    if (!checkMuteButton()) {
        bgMusic.pause();
    }
}

/**
 * Retrieves the necessary DOM elements for the game and stores them in variables.
 */
function getElements() {
    canvas = document.getElementById('canvas');
    headline = document.getElementById('headline')
    startTheGame = document.getElementById('start-screen');
    gameSettings = document.getElementById('game-settings');
    impressumSite = document.getElementById('impressum-site');
    fullscreenImg = document.getElementById('fullscreen-btn');
    bgMusic = document.getElementById('bg-music');
    volumeBtn = document.getElementById('volume-btn');
    audioSettings = document.getElementById('audio-settings');
    keyboardLayout = document.getElementById('keyboard-layout');
    gameOverScreen = document.getElementById('game-over');
    winScreen = document.getElementById('win');
    mobileDevice = document.getElementById('mobile-device');
}

