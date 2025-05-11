class World {

    healthBar = new StatusBar(healthBarConfig.initial, healthBarConfig.images, healthBarConfig.x, healthBarConfig.y);
    coinBar = new StatusBar(coinBarConfig.initial, coinBarConfig.images, coinBarConfig.x, coinBarConfig.y);
    bottleBar = new StatusBar(bottleBarConfig.initial, bottleBarConfig.images, bottleBarConfig.x, bottleBarConfig.y);
    healthBarEnboss = new StatusBar(healthBarEndbossConfig.initial, healthBarEndbossConfig.images, healthBarEndbossConfig.x, healthBarEndbossConfig.y);
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthCooldown = 0;
    lastBottleThrow = 0;
    exitGame = new ExitGame();
    buttonLeft = new ButtonLeft();
    buttonRight = new ButtonRight();
    buttonUp = new ButtonUp();
    buttonThrow = new ButtonThrow();
    throwableObjects = [];
    endbossActivated = false;
    healthBarTriggerd = false;
    get endboss() {
        return this.level.enemies.find(e => e instanceof Endboss);
    }
    pepeInTheAir = false;
    fillBottle = new Sounds('audio/fill_bottle.mp3', 0.5)
    coinCollected = new Sounds('audio/kaching.mp3', 0.2)
    chickenHitted = new Sounds('audio/boing.mp3', 0.2)

    /**
        * Creates an instance of the World class.
        * 
        * @param {HTMLCanvasElement} canvas - The canvas element for the game.
        * @param {Keyboard} keyboard - The keyboard instance for input handling.
        */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.bottles = 0;
        this.draw();
        this.setWorld();
        this.run();
        this.preventZoomAndScroll(canvas);
    }

    /**
     * Initializes the world, setting up the character and boss (if applicable).
     */
    setWorld() {
        this.character.world = this;
        const boss = this.endboss;
        if (boss) {
            boss.world = this;
        }
    }

    /**
     * Runs the game logic at regular intervals.
     */
    run() {
        setInterval(() => {
            this.checkInTheAir();
            this.checkCollision();
            this.checkCoinCollected();
            this.checkBottleCollected();
            this.checkThrowObjects();
            this.checkEndbossTrigger();
            this.checkBottleHitsEnemies();
        }, 100);
    }

    /**
     * Prevents zoom and scroll on the canvas element (used on mobile).
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    preventZoomAndScroll(canvas) {
        canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
        canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
        canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    /**
     * Checks if the character is in the air.
     */
    checkInTheAir() {
        if (this.character.y < 0) {
            this.pepeInTheAir = true;
        }
    }

    /**
     * Checks for bottle collisions with enemies and the boss.
     */
    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasHit) return;

            this.checkBottleCollisionsWithEnemies(bottle);
            this.checkBottleCollisionsWithBoss(bottle);
        });
    }

    /**
     * Checks for bottle collisions with enemies.
     * 
     * @param {ThrowableObject} bottle - The bottle object.
     */
    checkBottleCollisionsWithEnemies(bottle) {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                this.handleEnemyHit(bottle, enemy, enemyIndex);
            }
        });
    }

    /**
     * Handles a collision between a bottle and an enemy.
     * 
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Enemy} enemy - The enemy that was hit.
     * @param {number} enemyIndex - The index of the enemy in the `this.level.enemies` array.
     */
    handleEnemyHit(bottle, enemy, enemyIndex) {
        enemy.hitEnemies();

        if (enemy.isDeadEnemies()) {
            this.level.enemies[enemyIndex].speed = 0;
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
            }, 500);
        }

        bottle.handleHit();
    }

    /**
     * Checks for bottle collisions with the boss.
     * 
     * @param {ThrowableObject} bottle - The bottle object.
     */
    checkBottleCollisionsWithBoss(bottle) {
        const boss = this.endboss;
        if (boss && boss.bossActive && bottle.isColliding(boss)) {
            this.handleBossHit(bottle, boss);
        }
    }

    /**
     * Handles a collision between a bottle and the boss.
     * 
     * @param {ThrowableObject} bottle - The bottle object.
     * @param {Endboss} boss - The boss object.
     */
    handleBossHit(bottle, boss) {
        boss.hit();
        this.healthBarEnboss.setPercentage(boss.energy);
        bottle.handleHit();
    }

    /**
     * Checks if the endboss should be triggered based on the character's position.
     */
    checkEndbossTrigger() {
        const triggerX = 1750;
        if (this.character.x >= triggerX && !this.endbossActivated) {
            const boss = this.endboss;
            if (boss) {
                boss.activateBoss();
                startBossFight();
                this.endbossActivated = true;

                if (!this.healthBarTriggerd) {
                    this.healthBarEnboss.setPercentage(80);
                    this.healthBarTriggerd = true;
                }
            }
        }
    }

    /**
     * Checks for collisions between the character and enemies or the endboss.
     */
    checkCollision() {
        if (!this.endbossActivated) {
            this.checkCollisionsWithEnemies();
        } else {
            this.checkCollisionsWithEndboss();
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy, index);
            }
        });
    }

    /**
     * Handles the collision between the character and an enemy.
     * Depending on the conditions, it either processes a regular character hit or
     * handles the case where the character is in the air and hits an enemy.
     * 
     * @param {Object} enemy - The enemy that the character is colliding with.
     * @param {number} index - The index of the enemy in the `this.level.enemies` array.
     */
    handleEnemyCollision(enemy, index) {
        if (this.character.y > 100 && !this.pepeInTheAir && !enemy.isDeadEnemies()) {
            this.handleCharacterHit();
        } else if (this.pepeInTheAir && !this.endbossActivated) {
            this.handleCharacterInAirHit(enemy, index);
        }
    }

    /**
     * Handles the character being hit by an enemy.
     */
    handleCharacterHit() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * Handles the character being in the air and hitting an enemy.
     * 
     * @param {Object} enemy - The enemy that the character hit.
     * @param {number} index - The index of the enemy in the `this.level.enemies` array.
     */
    handleCharacterInAirHit(enemy, index) {
        enemy.hitEnemies();
        enemy.speed = 0;
        this.pepeInTheAir = false;
        this.chickenHitted.playSound();
        this.character.speedY = 20;
        if (this.character.y > 130) {
            this.character.y = 130;
        }
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    /**
     * Checks for collisions between the character and the endboss.
     */
    checkCollisionsWithEndboss() {
        const endboss = this.level.enemies[this.level.enemies.length - 1];
        if (this.character.isColliding(endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(0);
            this.character.energy = 0;
        }
    }

    /**
     * Checks for collected coins.
     */
    checkCoinCollected() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinCollected.playSound();
                this.character.coins += 20;
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collected bottles.
     */
    checkBottleCollected() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < this.character.maxBottles) {
                this.character.bottles++;
                this.fillBottle.playSound();
                let percent = (this.character.bottles / this.character.maxBottles) * 100;
                this.bottleBar.setPercentage(percent);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Checks for thrown objects (bottles).
     */
    checkThrowObjects() {
        const now = Date.now();
        const throwCooldown = 800;

        if (
            this.keyboard.D &&
            this.character.bottles > 0 &&
            now - this.lastBottleThrow > throwCooldown
        ) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);

            this.character.bottles--;
            let percent = (this.character.bottles / this.character.maxBottles) * 100;
            this.bottleBar.setPercentage(percent);

            this.lastBottleThrow = now;
        }
    }

    /**
     * Draws the game objects to the canvas.
     */
    draw() {
        this.clearCanvas();
        this.handleCameraTranslation();
        this.addBackgroundObjectsToMap();
        this.addCharacterToMap();
        this.addCloudsAndEnemiesToMap();
        this.addThrowableObjectsAndItemsToMap();
        this.addFixedObjectsToMap();
        this.resetCameraTranslation();
        this.requestNextFrame();
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Handles camera translation.
     */
    handleCameraTranslation() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds background objects to the map.
     */
    addBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Adds the character to the map.
     */
    addCharacterToMap() {
        this.addToMap(this.character);
    }

    /**
     * Adds clouds and enemies to the map.
     */
    addCloudsAndEnemiesToMap() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Adds fixed objects (e.g., UI elements) to the map.
     */
    addFixedObjectsToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.healthBarEnboss);
        this.addToMap(this.exitGame);
        this.loadMobileButtons();
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds throwable objects and items to the map.
     */
    addThrowableObjectsAndItemsToMap() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Resets camera translation.
     */
    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Loads mobile-specific buttons if the device supports touch.
     */
    loadMobileButtons() {
        if (isTouch) {
            this.addToMap(this.buttonLeft);
            this.addToMap(this.buttonRight);
            this.addToMap(this.buttonUp);
            this.addToMap(this.buttonThrow);
        }
    }

    /**
     * Adds multiple objects to the map by drawing them on the canvas.
     * 
     * @param {Array} objects - An array of objects to be added to the map.
     * Each object should have a `draw` method and may have a `flipImage` property.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map by drawing it on the canvas.
     * 
     * @param {Object} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally on the canvas.
     * 
     * @param {Object} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the object back to its original orientation.
     * 
     * @param {Object} mo - The object to be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}