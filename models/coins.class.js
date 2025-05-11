class Coins extends MoveableObject {

    height = 144;
    width = 144;
    counter = 1;
    collisionOffsetX = 50;
    collisionOffsetY = 50;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of the Coins class, setting position, loading images, and starting animation.
     * 
     * @param {number} offset - The horizontal offset added to the base x position.
     */
    constructor(offset) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 300 + offset;
        this.y = Math.random() * 100;
        this.animate();
    }

    /**
     * Starts the animation for the coin by looping through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }

}