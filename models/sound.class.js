class Sounds {

    /**
     * Creates an instance of the Sound class, initializing it with a sound file and volume.
     * 
     * @param {string} soundFile - The path to the sound file to be loaded.
     * @param {number} volume - The volume level for the sound (between 0 and 1).
     */
    constructor(soundFile, volume) {
        this.sound = new Audio(soundFile);
        this.sound.volume = volume;
        this.cooldown = false;
    }

    /**
     * Plays the sound if the mute setting is not active and the cooldown is not in effect.
     * Resets the audio to the beginning and triggers cooldown to prevent rapid replay.
     */
    playSound() {
        if (!this.checkMuteButton() && !this.cooldown) {
            this.sound.currentTime = 0;
            this.sound.play();
            this.stopRepeat();
        }
    }

    /**
     * Checks if the music is muted by reading the 'musicMuted' value from localStorage.
     * 
     * @returns {boolean} True if music is muted, false otherwise.
     */
    checkMuteButton() {
        return localStorage.getItem('musicMuted') === 'true';
    }

    /**
     * Sets a short cooldown period to prevent the sound from being played repeatedly in quick succession.
     */
    stopRepeat() {
        this.cooldown = true;
        setTimeout(() => {
            this.cooldown = false;
        }, 200);
    }
}
