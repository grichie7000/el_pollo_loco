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

function init() {
    getElements();
    initStartScreen();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

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

function startBossFight() {
    if (!checkMuteButton()) {
        bgMusic.pause();
    }

}

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

