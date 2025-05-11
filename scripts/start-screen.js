/**
 * Initializes the start screen by checking orientation, updating the volume icon, 
 * and setting the initial value of the background music volume.
 */
function initStartScreen() {
    checkOrientationAndShowMessage()
    updateVolumeIcon();
    document.getElementById('bg-music-volume').value = progressValue;
}

/**
 * Starts the game by loading the music setting, initializing the game level, 
 * and displaying the world after a short delay.
 */
function startGame() {
    loadMusicSetting();
    startTheGame.classList.add("disappear")
    initLevel()
    world = new World(canvas, keyboard);
    setTimeout(() => {
        startTheGame.style.display = 'none';
        canvas.style.display = 'block';
    }, 500);
}

/**
 * Stops the game by removing the start screen, hiding the canvas, 
 * and resetting variables related to the game state.
 */
function stopGame(tryAgain) {
    startTheGame.classList.remove("disappear")
    gameOverScreen.style.display = 'none';
    winScreen.style.display = 'none';
    canvas.style.display = 'none';
    startTheGame.style.display = 'block';
    isTouch = false;
    clearAllIntervals();
    if (tryAgain == true) {
        startGame();
        tryAgain = false;
    }
}

/**
 * Displays the winner screen and resumes background music if not muted.
 */
function showWinnerScreen() {
    canvas.style.display = 'none';
    winScreen.style.display = 'block';
    if (!checkMuteButton()) {
        bgMusic.play();
    }
    clearAllIntervals();
}

/**
 * Displays the game over screen and resumes background music if not muted.
 */
function gameOver() {
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'block';
    if (!checkMuteButton()) {
        bgMusic.play();
    }
}

/**
 * Shows the game settings menu.
 */
function showgameSettings() {
    startTheGame.style.display = 'none';
    gameSettings.style.display = 'flex';
}

/**
 * Opens the impressum page.
 */
function openImpressum() {
    startTheGame.style.display = 'none';
    impressumSite.style.display = 'flex';
}

/**
 * Navigates back to the main menu and resets the layout settings.
 */
function backToMenu() {
    startTheGame.style.display = 'flex';
    gameSettings.style.display = 'none';
    impressumSite.style.display = 'none';
    keyboardLayout.classList.add("activ");
    audioSettings.classList.remove("activ");
    showKeyboard();
}

/**
 * Loads the music settings, such as whether the music is muted or not, 
 * and applies the saved volume level.
 */
function loadMusicSetting() {
    const musicSetting = localStorage.getItem('musicMuted');
    const saved = localStorage.getItem('volume');
    if (saved) savedVolume = saved;

    if (musicSetting === 'true') {
        pauseMusic();
    } else {
        playMusic();
    }
}

/**
 * Checks if the music is muted.
 * 
 * @returns {boolean} True if the music is muted, false otherwise.
 */
function checkMuteButton() {
    return localStorage.getItem('musicMuted') === 'true';
}

/**
 * Toggles the music between play and pause.
 */
function toggleMusic() {
    if (!musicIsPlaying) {
        playMusic();
    } else {
        pauseMusic();
    }
}

/**
 * Plays the background music, updates the volume icon, 
 * and stores the music state in localStorage.
 */
function playMusic() {
    bgMusic.play();
    volumeBtn.src = "icons/volume-up.png";
    bgMusic.volume = savedVolume;
    musicIsPlaying = true;
    localStorage.setItem('musicMuted', 'false');
}

/**
 * Pauses the background music, updates the volume icon, 
 * and stores the music state in localStorage.
 */
function pauseMusic() {
    bgMusic.pause();
    volumeBtn.src = "icons/volume-mute.png";
    musicIsPlaying = false;
    localStorage.setItem('musicMuted', 'true')
}

/**
 * Toggles the fullscreen mode by either entering or leaving fullscreen.
 */
function toggleFullscreen() {
    if (!isFullscreen) {
        startFullscreen();
    } else {
        leaveFullscreen();
    }
}

/**
 * Updates the volume icon based on the music mute status stored in localStorage.
 */
function updateVolumeIcon() {
    const musicSetting = localStorage.getItem('musicMuted');
    if (musicSetting === 'true') {
        volumeBtn.src = "icons/volume-mute.png";
    } else {
        volumeBtn.src = "icons/volume-up.png";
    }
}

/**
 * Enters fullscreen mode by requesting the fullscreen API and adjusting the UI.
 */
function startFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    headline.classList.add('d_none')
    canvas.classList.add('fullscreen-canvas');
    fullscreenImg.src = "./icons/minimize.png";
    isFullscreen = true;
}

/**
 * Leaves fullscreen mode by requesting to exit fullscreen and adjusting the UI.
 */
function leaveFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    headline.classList.remove('d_none')
    canvas.classList.remove('fullscreen-canvas')
    fullscreenImg.src = "./icons/maximize.png";
    isFullscreen = false;
    document.body.offsetHeight;
}

/**
 * Switches between keyboard layout settings and audio settings views
 * based on the selected menu item.
 * 
 * @param {number} menuItem - The selected menu item. 
 * Use `1` to show keyboard layout settings, or `2` to show audio settings.
 * 
 * @example
 * switchSettings(1); // Activates keyboard layout settings
 * switchSettings(2); // Activates audio settings
 */
function switchSettings(menuItem) {
    if (menuItem == 1) {
        keyboardLayout.classList.add("activ");
        audioSettings.classList.remove("activ");
        showKeyboard()
    }

    if (menuItem == 2) {
        audioSettings.classList.add("activ");
        keyboardLayout.classList.remove("activ");
        showAudio()
    }
}

/**
 * Displays the keyboard layout settings.
 */
function showKeyboard() {
    document.getElementById('display-audio-settings').style.display = 'none'
    document.getElementById('display-keyboard-layout').style.display = 'block'
}

/**
 * Displays the audio settings.
 */
function showAudio() {
    document.getElementById('display-audio-settings').style.display = 'flex'
    document.getElementById('display-keyboard-layout').style.display = 'none'
}

/**
 * Changes the volume based on the button clicked and updates the volume display.
 * 
 * @param {HTMLElement} button - The volume button clicked.
 * @param {number} delta - The amount by which to change the volume.
 */
function changeVolume(button, delta) {
    const progress = button.parentElement.querySelector('progress');
    let newVolume = parseInt(progress.value) + delta;

    newVolume = Math.max(0, Math.min(progress.max, newVolume));
    progress.value = newVolume;

    savedVolume = newVolume / 100
    localStorage.setItem('volume', savedVolume)
    playMusic();
}
