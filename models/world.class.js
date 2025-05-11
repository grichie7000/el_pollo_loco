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

    setWorld() {
        this.character.world = this;
        const boss = this.endboss;
        if (boss) {
            boss.world = this;
        }
    }

    run() {
        setInterval(() => {
            this.checkInTheAir()
            this.checkCollision();
            this.checkCoinCollected();
            this.checkBottleCollected()
            this.checkThrowObjects();
            this.checkEndbossTrigger();
            this.checkBottleHitsEnemies();
        }, 100);
    }

    preventZoomAndScroll(canvas) {
        // Verhindere das Scrollen mit dem Maus-Scrollrad
        canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

        // Verhindere Touch-Zoom und Touch-Scrollen
        canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
        canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

        // Verhindere das Kontextmenü (Rechtsklick und lange Berührung)
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }



    checkInTheAir() {
        if (this.character.y < 0) {
            this.pepeInTheAir = true;
        }
    }

    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasHit) return;

            this.checkBottleCollisionsWithEnemies(bottle);
            this.checkBottleCollisionsWithBoss(bottle);
        });
    }

    checkBottleCollisionsWithEnemies(bottle) {
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (bottle.isColliding(enemy)) {
                this.handleEnemyHit(bottle, enemy, enemyIndex);
            }
        });
    }

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

    checkBottleCollisionsWithBoss(bottle) {
        const boss = this.endboss;
        if (boss && boss.bossActive && bottle.isColliding(boss)) {
            this.handleBossHit(bottle, boss);
        }
    }

    handleBossHit(bottle, boss) {
        boss.hit();
        this.healthBarEnboss.setPercentage(boss.energy);
        bottle.handleHit();
    }

    checkEndbossTrigger() {
        const triggerX = 1750;
        if (this.character.x >= triggerX && !this.endbossActivated) {
            const boss = this.endboss;
            if (boss) {
                boss.activateBoss();  // ✅ Jetzt startet er erst hier
                startBossFight();
                this.endbossActivated = true;

                if (!this.healthBarTriggerd) {
                    this.healthBarEnboss.setPercentage(80);
                    this.healthBarTriggerd = true;
                }
            }
        }
    }

    checkCollision() {
        if (!this.endbossActivated) {
            this.checkCollisionsWithEnemies();
        } else {
            this.checkCollisionsWithEndboss();
        }
    }

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

    handleCharacterHit() {
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
    }

    handleCharacterInAirHit(enemy, index) {
        enemy.hitEnemies();
        enemy.speed = 0;
        this.pepeInTheAir = false;
        this.chickenHitted.playSound();

        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    checkCollisionsWithEndboss() {
        const endboss = this.level.enemies[this.level.enemies.length - 1];
        if (this.character.isColliding(endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(0);
            this.character.energy = 0;
        }
    }

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

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleCameraTranslation() {
        this.ctx.translate(this.camera_x, 0);
    }

    addBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    addCharacterToMap() {
        this.addToMap(this.character);
    }

    addCloudsAndEnemiesToMap() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
    }

    addFixedObjectsToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.healthBarEnboss);
        this.addToMap(this.exitGame);
        this.loadMobileButtons()
        this.ctx.translate(this.camera_x, 0);
    }

    addThrowableObjectsAndItemsToMap() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    resetCameraTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

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
    * Iterates over each object in the `objects` array and calls `addToMap()` for each.
    * 
    * @param {Array} objects - An array of objects to be added to the map.
    * Each object should have a `draw` method and may have a `flipImage` property.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    /**
    * Adds a single object to the map by drawing it on the canvas and drawing its frame.
    * If the object is facing the opposite direction, it flips the image horizontally.
    * 
    * @param {Object} mo - The object to be added to the map. The object should have:
    *   - `otherDirection` (boolean): A flag indicating if the object should be flipped horizontally.
    *   - `draw` (function): A method to draw the object on the canvas.
    *   - `drawFrame` (function): A method to draw the object's collision frame (if applicable).
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx)


        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
    * Flips an object horizontally on the canvas by saving the current canvas state,
    * translating the context, and scaling the image negatively.
    * 
    * @param {Object} mo - The object to be flipped. The object should have a `width` and `x` property.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the canvas state after flipping an object and flips the object's x-coordinate back.
    * 
    * @param {Object} mo - The object to be flipped back. The object should have an `x` property.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}