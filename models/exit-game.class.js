class ExitGame extends DrawableObject {
    IMAGES = [
        'icons/logout.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setIcon();
        canvas.addEventListener('click', (event) => this.handleClick(event));
        canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    }

    /**
     * Initializes the icon's position and size, and assigns the image.
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
     * Calculates the actual mouse position relative to the canvas,
     * accounting for scaling (e.g. fullscreen mode).
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {MouseEvent} event - The mouse event.
     * @returns {{x: number, y: number}} The adjusted mouse coordinates.
     */
    getMousePos(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    /**
     * Handles mouse movement events to change the cursor style when hovering over the exit button.
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
     * Determines whether the given coordinates are within the clickable area of the button.
     * 
     * @param {number} mouseX - The X coordinate of the mouse.
     * @param {number} mouseY - The Y coordinate of the mouse.
     * @returns {boolean} True if the coordinates are inside the button, false otherwise.
     */
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
     * Determines whether the mouse is currently hovering over the button.
     * 
     * @param {number} mouseX - The X coordinate of the mouse.
     * @param {number} mouseY - The Y coordinate of the mouse.
     * @returns {boolean} True if the mouse is over the button, false otherwise.
     */
    isMouseOver(mouseX, mouseY) {
        return this.isClicked(mouseX, mouseY);
    }

    /**
     * Handles click events and triggers the game stop if the button is clicked.
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
