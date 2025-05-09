class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Constructor for the object that loads an image and sets its position on the Y and X axes.
     *
     * @param {string} imagePath - The path to the image to be loaded.
     * @param {number} x - The X position where the image should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }


}