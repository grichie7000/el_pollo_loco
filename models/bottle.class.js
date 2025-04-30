class Bottles extends MoveableObject {

    height = 96;
    width = 96;
    counter = 1;
    collisionOffsetX = 20;
    collisionOffsetY = 0;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor(offset) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES)
        this.x = 300 + offset;
        this.y = 330;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200);
    }

}