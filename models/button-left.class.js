/**
 * Represents a virtual "Left" button for touch controls.
 * Inherits from DrawableObject.
 */
class ButtonLeft extends DrawableObject {
    IMAGES = ['icons/touchLeft.png'];

    /**
     * Initializes the button and registers relevant touch event listeners.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setIcon();

        canvas.addEventListener('touchstart', (e) => this.handleTouch(e, true), { passive: false });
        canvas.addEventListener('touchend', (e) => this.handleTouch(e, false), { passive: false });
        canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        canvas.addEventListener('contextmenu', (e) => e.preventDefault(), { passive: false });
    }

    /**
     * Sets the position, size, and image for the left button.
     */
    setIcon() {
        let path = this.IMAGES[0];
        this.x = 30;                      // Adjust as needed
        this.y = canvas.height - 150;
        this.width = 120;
        this.height = 120;
        this.img = this.imageCache[path];
    }

    /**
     * Gets the position of the touch event relative to the canvas.
     * @param {HTMLCanvasElement} canvas 
     * @param {TouchEvent} event 
     * @returns {{x: number, y: number}}
     */
    getTouchPos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0] || event.changedTouches[0];
        return {
            x: (touch.clientX - rect.left) * (canvas.width / rect.width),
            y: (touch.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    /**
     * Checks whether the button has been touched.
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean}
     */
    isTouched(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }

    /**
     * Handles the touch interaction and updates the keyboard state.
     * @param {TouchEvent} event 
     * @param {boolean} pressed 
     */
    handleTouch(event, pressed) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isTouched(x, y)) {
            keyboard.LEFT = pressed;
        }
    }
}

