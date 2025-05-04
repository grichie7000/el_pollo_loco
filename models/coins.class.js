class Coins extends MoveableObject {

    height = 144;
    width = 144;
    counter = 1;
    collisionOffsetX = 50;
    collisionOffsetY = 50;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(offset) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES)
        this.x = 300 + offset;
        this.y = Math.random() * 100;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 200);
    }

}