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

    /**
 * Handles mouse movement events to change the cursor style when hovering over the exit button.
 * 
 * @param {MouseEvent} event - The mouse move event.
 */
    handleMouseMove(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        if (this.isMouseOver(mouseX, mouseY)) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    /**
 * Checks if the mouse click is inside the bounds of the exit button.
 *
 * @param {number} mouseX - The X-coordinate of the mouse.
 * @param {number} mouseY - The Y-coordinate of the mouse.
 * @returns {boolean} True if the click is within the bounds of the exit button, otherwise false.
 */
    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
 * Checks if the mouse coordinates are within the bounds of the exit button.
 *
 * @param {number} mouseX - The X-coordinate of the mouse.
 * @param {number} mouseY - The Y-coordinate of the mouse.
 * @returns {boolean} True if the mouse is over the exit button, otherwise false.
 */
    isMouseOver(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    /**
 * Checks if the exit button is clicked based on the mouse coordinates.
 * 
 * @param {MouseEvent} event - The mouse click event.
 */
    handleClick(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        if (this.isClicked(mouseX, mouseY)) {
            stopGame();
        }
    }
}