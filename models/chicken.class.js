class Chicken extends MoveableObject {

    height = 80;
    width = 80;
    y = 350;
    energy = 20;
    collisionOffsetX = 20;
    collisionOffsetY = -10;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
     * Creates an instance of the Chicken class, initializes its position, speed, and loads animation images.
     * 
     * @param {number} spawnOffset - The horizontal offset for the chicken's initial position.
     */
    constructor(spawnOffset) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = spawnOffset;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts movement and animation intervals to control the chicken's behavior.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.playAnimations();
    }

    /**
     * Controls which animation to play based on whether the chicken is alive or dead.
     */
    playAnimations() {
        setInterval(() => {
            if (this.isDeadEnemies()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}
