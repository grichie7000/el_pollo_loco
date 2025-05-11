class ExitGame extends DrawableObject {
    IMAGES = [
        'icons/logout.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setIcon();

        // Mouse Events
        canvas.addEventListener('click', (event) => this.handleClick(event));
        canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));

        // Touch Events
        canvas.addEventListener('touchstart', (event) => this.handleTouch(event));
        canvas.addEventListener('touchend', (event) => this.handleTouchEnd(event));
    }

    setIcon() {
        let path = this.IMAGES[0];
        this.x = 650;
        this.y = 20;
        this.width = 36;
        this.height = 36;
        this.img = this.imageCache[path];
    }

    // Für Touch-Events verwenden wir eine ähnliche Methode wie für Mausposition
    getTouchPos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0] || event.changedTouches[0];
        return {
            x: (touch.clientX - rect.left) * (canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    handleMouseMove(event) {
        const { x: mouseX, y: mouseY } = this.getMousePos(canvas, event);
        if (this.isMouseOver(mouseX, mouseY)) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    handleTouch(event) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isClicked(x, y)) {
            stopGame();
        }
    }

    handleTouchEnd(event) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isClicked(x, y)) {
            stopGame();
        }
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    isMouseOver(mouseX, mouseY) {
        return this.isClicked(mouseX, mouseY);
    }

    handleClick(event) {
        const { x: mouseX, y: mouseY } = this.getMousePos(canvas, event);

        if (this.isClicked(mouseX, mouseY)) {
            stopGame();
        }
    }
}
