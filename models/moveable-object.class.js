class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object by continuously updating its vertical position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground level, considering its specific type.
     * 
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 350;
        } else if (this instanceof Endboss) {
            return this.y < -45; 
        } else {
            return this.y < 130;
        }
    }

    /**
     * Checks for collision with another moveable object.
     * 
     * @param {MoveableObject} mo - The other moveable object to check collision with.
     * @returns {boolean} True if objects are colliding, false otherwise.
     */
    isColliding(mo) {
        const offsetCharX = this instanceof Character ? this.hitboxOffsetX || 0 : this.collisionOffsetX || 0;
        const offsetCharY = this instanceof Character ? this.hitboxOffsetY || 0 : this.collisionOffsetY || 0;

        const offsetX = mo instanceof Character ? mo.hitboxOffsetX || 0 : mo.collisionOffsetX || 0;
        const offsetY = mo instanceof Character ? mo.hitboxOffsetY || 0 : mo.collisionOffsetY || 0;

        return this.x + offsetCharX < mo.x + mo.width - offsetX &&
            this.x + this.width - offsetCharX > mo.x + offsetX &&
            this.y + offsetCharY < mo.y + mo.height &&
            this.y + this.height > mo.y + offsetY;
    }

    /**
     * Reduces the object's energy by 5 and records the time of the hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles behavior after being hit. Prevents multiple hits and starts splash animation.
     */
    handleHit() {
        if (!this.hasHit) {
            this.hasHit = true;
            this.speedY = 0;
            this.playSplashAnimation();
        }
    }

    /**
     * Determines whether the object is currently in a hurt state.
     * 
     * @returns {boolean} True if recently hit, false otherwise.
     */
    isHurt() {
        const now = new Date().getTime();
        let timepassed = now - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 1;
    }

    /**
     * Checks whether the object is dead (energy at 0).
     * 
     * @returns {boolean} True if energy is 0, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Reduces energy by 20 when hitting enemies. Sets energy to 0 if depleted.
     */
    hitEnemies() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }

    /**
     * Checks whether an enemy object is dead (energy at 0).
     * 
     * @returns {boolean} True if energy is 0, false otherwise.
     */
    isDeadEnemies() {
        return this.energy == 0;
    }

    /**
     * Plays an animation using a sequence of image paths.
     * 
     * @param {string[]} images - An array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks whether the object is idle (no input) and starts an AFK timer.
     * 
     * @returns {boolean} True if object is idle and within AFK threshold.
     */
    isIdle() {
        if (!this.world.keyboard.D && !this.world.keyboard.UP && !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT && (this.afkTimeInSeconds < this.timeToBeAfk)) {
            setInterval(() => {
                this.afkTimeInSeconds++;
            }, 1000);
            return true;
        }
    }

    /**
     * Checks whether the object has been idle for a long time (AFK).
     * 
     * @returns {boolean} True if object has been idle longer than the threshold, false otherwise.
     */
    isLongIdle() {
        if (!this.world.keyboard.D && !this.world.keyboard.UP && !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT && (this.afkTimeInSeconds > this.timeToBeAfk)) {
            return true;
        } else {
            this.afkTimeInSeconds = 0;
        }
    }
}
