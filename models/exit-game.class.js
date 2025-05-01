class ExitGame extends DrawableObject {

    IMAGES = [
        'icons/logout.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.GAME_OVER)
        this.setIcon()
        canvas.addEventListener('click', (event) => this.handleClick(event));
        canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

    setIcon() {
        let path = this.IMAGES[0]
        this.x = 650;
        this.y = 20;
        this.width = 36;
        this.height = 36;
        this.img = this.imageCache[path]
    }

    handleMouseMove(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        if (this.isMouseOver(mouseX, mouseY)) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    isMouseOver(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    handleClick(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        if (this.isClicked(mouseX, mouseY)) {
            stopGame();
        }
    }
}