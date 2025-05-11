/**
 * Tracks whether the device supports touch events.
 * 
 * @type {boolean}
 */
let isTouch = false;

/**
 * Event listener that sets `isTouch` to true when a touch event is detected.
 */
window.addEventListener('touchstart', () => {
    isTouch = true;
});

/**
 * Checks the orientation of the window and displays a message for mobile users
 * to hold the device in portrait mode. Hides the start screen if the device
 * is in portrait mode, and shows it in landscape mode.
 */
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

/**
 * Adds an event listener to detect window resizing and triggers
 * `checkOrientationAndShowMessage` to recheck the device's orientation.
 */
window.addEventListener('resize', checkOrientationAndShowMessage);
