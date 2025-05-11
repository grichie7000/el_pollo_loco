/**
 * Represents a virtual "Up" button for touch devices.
 * Inherits from DrawableObject.
 */
class ButtonUp extends DrawableObject {
    IMAGES = ['icons/touchUp.png'];

    /**
     * Initializes the button, loads images, sets its position and registers touch event listeners.
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
     * Sets the position, size, and image for the button.
     */
    setIcon() {
        let path = this.IMAGES[0];
        this.x = canvas.width - 250;
        this.y = canvas.height - 150;
        this.width = 120;
        this.height = 120;
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the touch position relative to the canvas.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {TouchEvent} event - The touch event.
     * @returns {{x: number, y: number}} The touch coordinates.
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
     * Determines whether the touch position intersects with the button area.
     * @param {number} x - X-coordinate of the touch.
     * @param {number} y - Y-coordinate of the touch.
     * @returns {boolean} True if touched within button bounds.
     */
    isTouched(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }

    /**
     * Handles touch start/end events and sets the corresponding key state.
     * @param {TouchEvent} event - The touch event.
     * @param {boolean} pressed - Whether the button is pressed or released.
     */
    handleTouch(event, pressed) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isTouched(x, y)) {
            keyboard.UP = pressed;
        }
    }

    /**
* Handles the touch interaction and updates the keyboard state.
* @param {TouchEvent} event 
*/
    handleTouchMove(event) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (!this.isTouched(x, y)) {
            keyboard.UP = false;
        }
    }
}
