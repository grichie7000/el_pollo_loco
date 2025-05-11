class LittleChicken extends MoveableObject {

    height = 80;
    width = 80;
    y = 340;
    collisionOffsetX = 20;
    collisionOffsetY = 0;
    energy = 20;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
     * Creates an instance of the LittleChicken class, loads images and starts animation.
     * 
     * @param {number} spawnOffset - The x-coordinate where the chicken should spawn.
     */
    constructor(spawnOffset) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = spawnOffset;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate()
    }

    /**
     * Starts movement and walking animation of the LittleChicken.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.playAnimations();
    }

    /**
     * Plays either walking or dead animation based on the chicken's state.
     */
    playAnimations() {
        setInterval(() => {
            if (this.isDeadEnemies()) {
                this.playAnimation(this.IMAGES_DEAD)
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 100);
    }
}
