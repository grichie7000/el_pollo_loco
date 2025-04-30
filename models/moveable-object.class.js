class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 120;
        }
    }

    isColliding(mo) {
        const offsetCharX = this instanceof Character ? this.hitboxOffsetX || 0 : this.collisionOffsetX || 0;
        const offsetCharY = this instanceof Character ? this.hitboxOffsetY || 0 : this.collisionOffsetY || 0;

        const offsetX = mo.collisionOffsetX || 0;
        const offsetY = mo.collisionOffsetY || 0;

        return this.x + offsetX < mo.x + mo.width - offsetX &&
            this.x + this.width - offsetX > mo.x + offsetX &&
            this.y + offsetCharY < mo.y + mo.height - offsetY &&
            this.y + this.height - offsetCharY > mo.y + offsetY;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isIdle() {
        if (!this.world.keyboard.UP && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && (this.afkTimeInSeconds < this.timeToBeAfk)) {
            setInterval(() => {
                this.afkTimeInSeconds++;
            }, 1000);
            return true;
        }
    }

    isLongIdle() {
        if (!this.world.keyboard.UP && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && (this.afkTimeInSeconds > this.timeToBeAfk)) {
            return true;
        }
    }


}