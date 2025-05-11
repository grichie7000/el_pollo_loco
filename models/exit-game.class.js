class ExitGame extends DrawableObject {
    IMAGES = [
        'icons/logout.png'
    ];

    /**
     * Constructor for ExitGame.
     * Initializes the button icon and sets up event listeners for mouse and touch events.
     */
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

    /**
     * Initializes the icon's position, size, and assigns the image.
     * Sets the position of the exit button and its dimensions.
     */
    setIcon() {
        let path = this.IMAGES[0];
        this.x = 650;
        this.y = 20;
        this.width = 36;
        this.height = 36;
        this.img = this.imageCache[path];
    }

    /**
     * Gets the position of the touch event relative to the canvas, accounting for scaling.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {TouchEvent} event - The touch event.
     * @returns {{x: number, y: number}} - The adjusted touch coordinates.
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
     * Gets the position of the mouse event relative to the canvas, accounting for scaling.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {MouseEvent} event - The mouse event.
     * @returns {{x: number, y: number}} - The adjusted mouse coordinates.
     */
    getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    /**
     * Handles mouse movement events and changes the cursor style when hovering over the exit button.
     * 
     * @param {MouseEvent} event - The mouse move event.
     */
    handleMouseMove(event) {
        const { x: mouseX, y: mouseY } = this.getMousePos(canvas, event);
        if (this.isMouseOver(mouseX, mouseY)) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    /**
     * Handles touchstart events. Triggers game stop if the button is touched.
     * 
     * @param {TouchEvent} event - The touchstart event.
     */
    handleTouch(event) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isClicked(x, y)) {
            stopGame();
        }
    }

    /**
     * Handles touchend events. Triggers game stop if the button is released.
     * 
     * @param {TouchEvent} event - The touchend event.
     */
    handleTouchEnd(event) {
        const { x, y } = this.getTouchPos(canvas, event);
        if (this.isClicked(x, y)) {
            stopGame();
        }
    }

    /**
     * Checks whether the mouse or touch coordinates are within the clickable area of the button.
     * 
     * @param {number} mouseX - The X coordinate of the mouse or touch.
     * @param {number} mouseY - The Y coordinate of the mouse or touch.
     * @returns {boolean} - True if the coordinates are inside the button, false otherwise.
     */
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Checks whether the mouse or touch coordinates are within the bounds of the button.
     * 
     * @param {number} mouseX - The X coordinate of the mouse or touch.
     * @param {number} mouseY - The Y coordinate of the mouse or touch.
     * @returns {boolean} - True if the coordinates are inside the button, false otherwise.
     */
    isMouseOver(mouseX, mouseY) {
        return this.isClicked(mouseX, mouseY);
    }

    /**
     * Handles mouse click events and triggers the game stop if the button is clicked.
     * 
     * @param {MouseEvent} event - The mouse click event.
     */
    handleClick(event) {
        const { x: mouseX, y: mouseY } = this.getMousePos(canvas, event);

        if (this.isClicked(mouseX, mouseY)) {
            stopGame();
        }
    }
}
