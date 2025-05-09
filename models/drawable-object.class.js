class DrawableObject {
    x = 120;
    y = 120;
    width = 100;
    height = 100;

    currentImage = 0;
    img;
    imageCache = {};

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    loadImage(path = '') {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }
}