class StatusBar extends DrawableObject {

    /**
 * Creates an instance of the StatusBar class, initializing it with a percentage, images, and position.
 * 
 * @param {number} percentage - The initial percentage to display on the status bar (between 0 and 100).
 * @param {string[]} IMAGES - An array of image paths representing different states of the status bar.
 * @param {number} x - The x position of the status bar on the canvas.
 * @param {number} y - The y position of the status bar on the canvas.
 */
    constructor(percentage, IMAGES, x, y) {
        super();
        this.IMAGES = IMAGES;
        this.loadImages(IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage);
    }

    /**
 * Sets the percentage for the status bar and updates the displayed image based on the percentage.
 * Ensures the percentage is clamped between 0 and 100.
 * 
 * @param {number} percentage - The percentage to set (between 0 and 100).
 */
    setPercentage(percentage) {
        this.percentage = Math.max(0, Math.min(100, percentage));
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Resolve the index from the Image Array. for display the health. 
 */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}