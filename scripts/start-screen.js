
function initStartScreen() {
    checkOrientationAndShowMessage()
    updateVolumeIcon();
    document.getElementById('bg-music-volume').value = progressValue;
}

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


function stopGame() {
    startTheGame.classList.remove("disappear")
    gameOverScreen.style.display = 'none';
    winScreen.style.display = 'none';
    canvas.style.display = 'none';
    startTheGame.style.display = 'block';
    isTouch = false;
    clearAllIntervals();
}

function showWinnerScreen() {
    canvas.style.display = 'none';
    winScreen.style.display = 'block';
    if (!checkMuteButton()) {
        bgMusic.play();
    }

    clearAllIntervals();
}

function gameOver() {
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'block';
    if (!checkMuteButton()) {
        bgMusic.play();
    }
}

function showgameSettings() {
    startTheGame.style.display = 'none';
    gameSettings.style.display = 'flex';
}

function openImpressum() {
    startTheGame.style.display = 'none';
    impressumSite.style.display = 'flex';
}

function backToMenu() {
    startTheGame.style.display = 'flex';
    gameSettings.style.display = 'none';
    impressumSite.style.display = 'none';
    keyboardLayout.classList.add("activ");
    audioSettings.classList.remove("activ");
    showKeyboard();
}

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

function checkMuteButton() {
    return localStorage.getItem('musicMuted') === 'true';
}

function toggleMusic() {
    if (!musicIsPlaying) {
        playMusic();
    } else {
        pauseMusic();
    }
}

function playMusic() {
    bgMusic.play();
    volumeBtn.src = "icons/volume-up.png";
    bgMusic.volume = savedVolume;
    musicIsPlaying = true;
    localStorage.setItem('musicMuted', 'false');
}

function pauseMusic() {
    bgMusic.pause();
    volumeBtn.src = "icons/volume-mute.png";
    musicIsPlaying = false;
    localStorage.setItem('musicMuted', 'true')
}

function toggleFullscreen() {
    if (!isFullscreen) {
        startFullscreen();
    } else {
        leaveFullscreen();
    }
}

function updateVolumeIcon() {
    const musicSetting = localStorage.getItem('musicMuted');
    if (musicSetting === 'true') {
        volumeBtn.src = "icons/volume-mute.png";
    } else {
        volumeBtn.src = "icons/volume-up.png";
    }
}

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

function showKeyboard() {
    document.getElementById('display-audio-settings').style.display = 'none'
    document.getElementById('display-keyboard-layout').style.display = 'block'
}

function showAudio() {
    document.getElementById('display-audio-settings').style.display = 'flex'
    document.getElementById('display-keyboard-layout').style.display = 'none'
}

function changeVolume(button, delta) {
    const progress = button.parentElement.querySelector('progress');
    let newVolume = parseInt(progress.value) + delta;

    newVolume = Math.max(0, Math.min(progress.max, newVolume));
    progress.value = newVolume;

    savedVolume = newVolume / 100
    localStorage.setItem('volume', savedVolume)
    playMusic();
}