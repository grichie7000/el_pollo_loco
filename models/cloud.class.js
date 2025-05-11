class Cloud extends MoveableObject {

    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    /**
     * Creates an instance of the Cloud class, setting its initial position and starting its animation.
     */
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the animation of the cloud by continuously moving it to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
