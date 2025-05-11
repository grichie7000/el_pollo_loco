class Bottles extends MoveableObject {

    height = 96;
    width = 96;
    counter = 1;
    collisionOffsetX = 45;
    collisionOffsetY = 0;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    /**
 * Constructor for the object that loads an image and sets its position.
 * It also initializes the images and starts animation.
 *
 * @param {number} offset - The horizontal offset to adjust the X position.
 */
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