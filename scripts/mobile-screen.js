let isTouch = false;

window.addEventListener('touchstart', () => {
    isTouch = true;
});

function checkOrientationAndShowMessage() {
    const message = document.getElementById('mobile-device');
    if (!message) return;

    const isPortrait = window.innerHeight > window.innerWidth;

    if (isPortrait) {
        message.classList.remove('d_none');
        startTheGame.style.display = "none";
    } else {
        message.classList.add('d_none');
        startTheGame.style.display = "block";
    }
}

window.addEventListener('resize', checkOrientationAndShowMessage);
