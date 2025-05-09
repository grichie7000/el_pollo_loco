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

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 300 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate()
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.playAnimations();
    }


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