class DrawableObject {
    x = 120;
    y = 120;
    width = 100;
    height = 100;
    currentImage = 0;
    img;
    imageCache = {};

    /**
 * Draws a frame around the object for collision or hitbox visualization.
 * This is only visible for specific object types like `Character`, `Chicken`, etc.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
 */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins
            || this instanceof Bottles || this instanceof Endboss || this instanceof LittleChicken || this instanceof ThrowableObject) {
            const offsetX = this instanceof Character ? this.hitboxOffsetX || 0 : this.collisionOffsetX || 0;
            const offsetY = this instanceof Character ? this.hitboxOffsetY || 0 : this.collisionOffsetY || 0;

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + offsetX,
                this.y + offsetY,
                this.width - 2 * offsetX,
                this.height - offsetY
            );
            // ctx.stroke();
        }
    }

    /**
 * Draws the image on the canvas at the object's current position with its dimensions.
 *
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
 * Loads an image from a given path and assigns it to the `img` property.
 *
 * @param {string} path - The path to the image file.
 */
    loadImage(path = '') {
        this.img = new Image();
        this.img.src = path;
    }

    /**
 * Loads multiple images from an array of paths and caches them for later use.
 *
 * @param {string[]} arr - An array of image paths to load.
 */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }
}