function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

function checkDeviceSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (isMobileDevice()) {
        turnDevice(width, height)
    } else if (width < 720 || height < 480) {
        startTheGame.style.display = 'none';
        gameSettings.style.display = 'none';
        impressumSite.style.display = 'none';
        warningScreen.classList.remove('d_none');
    } else {
        startTheGame.style.display = 'block';
        warningScreen.classList.add('d_none');
    }
}

function turnDevice(width, height) {
    if (height > width) {
        startTheGame.style.display = 'none';
        gameSettings.style.display = 'none';
        impressumSite.style.display = 'none';
        mobileDevice.classList.remove('d_none');
    } else {
        startTheGame.style.display = 'block';
        mobileDevice.classList.add('d_none');
    }
}

window.addEventListener('resize', checkDeviceSize);
