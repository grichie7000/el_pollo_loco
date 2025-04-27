class Sounds {



    constructor(soundFile, volume) {
        this.sound = new Audio(soundFile);
        this.sound.volume = volume;
        this.cooldown = false;
    }

    playSound() {
        if (!this.checkMuteButton() && !this.cooldown) {
            this.sound.currentTime = 0;
            this.sound.play();
            this.stopRepeat()
        }

    }

    checkMuteButton() {
        const checkVolumeBtn = document.getElementById('volume-btn');
        const iconPath = new URL(checkVolumeBtn.src).pathname;

        if (iconPath === '/icons/volume-mute.png') {
            return true
        }
    }

    stopRepeat() {
        this.cooldown = true;
        setTimeout(() => {
            this.cooldown = false;
        }, 200);
    }
}