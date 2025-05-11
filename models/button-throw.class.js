class ButtonThrow extends DrawableObject {
    IMAGES = ['icons/touchD.png'];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setIcon();

        canvas.addEventListener('touchstart', (e) => this.handleTouch(e, true), { passive: false });
        canvas.addEventListener('touchend', (e) => this.handleTouch(e, false), { passive: false });
        canvas.addEventListener('contextmenu', (e) => e.preventDefault(), { passive: false });
    }

    setIcon() {
        let path = this.IMAGES[0];
        this.x = canvas.width - 130;
        this.y = canvas.height - 200;
        this.width = 120;
        this.height = 120;
        this.img = this.imageCache[path];
    }

    getTouchPos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0] || event.changedTouches[0];
        return {
            x: (touch.clientX - rect.left) * (canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    isTouched(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }

    handleTouch(event, pressed) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isTouched(x, y)) {
            keyboard.D = pressed;
        }
    }
}
