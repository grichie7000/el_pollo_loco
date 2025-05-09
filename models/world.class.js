class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthCooldown = 0;
    lastBottleThrow = 0;

    healthBar = new StatusBar(100,
        [
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
        ],
        30, 80
    );

    coinBar = new StatusBar(0,
        [
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
        ],
        30, 40
    );

    bottleBar = new StatusBar(0,
        [
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
        ],
        30, 0
    );

    healthBarEnboss = new StatusBar(100,
        [
            'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue0.png'
        ],
        30, 410
    );

    exitGame = new ExitGame();
    throwableObjects = [];
    endbossActivated = false;
    healthBarTriggerd = false;
    get endboss() {
        return this.level.enemies.find(e => e instanceof Endboss);
    }
    pepeInTheAir = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.bottles = 0;
        this.draw();
        this.setWorld();
        this.run();
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

    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hasHit) return;
            
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bottle.isColliding(enemy)) {
                    enemy.hitEnemies();

                    if (enemy.isDeadEnemies()) {
                        this.level.enemies[enemyIndex].speed = 0;
                        setTimeout(() => {
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 500);
                    }

                    bottle.handleHit();
                }
            });

            // Prüfe Endboss
            const boss = this.endboss;
            if (boss && boss.bossActive && bottle.isColliding(boss)) {
                boss.hit();
                this.healthBarEnboss.setPercentage(boss.energy);
                bottle.handleHit(); 
            }
        });
    }

    checkInTheAir() {
        if (this.character.y < 0) {
            this.pepeInTheAir = true;
        }
    }

    checkEndbossTrigger() {
        const triggerX = 1750;
        if (this.character.x >= triggerX && !this.endbossActivated) {
            const boss = this.endboss;
            if (boss) {
                boss.bossActive = true;
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
            this.level.enemies.forEach((enemy, index) => {
                if (this.character.isColliding(enemy)) {
                    if (this.character.y > 100 && !this.pepeInTheAir && !this.level.enemies[index].isDeadEnemies()) {
                        this.character.hit();
                        this.healthBar.setPercentage(this.character.energy);
                    } else if (this.pepeInTheAir && !this.endbossActivated) {

                        this.level.enemies[index].hitEnemies()
                        this.level.enemies[index].speed = 0;
                        this.pepeInTheAir = false;
                        setTimeout(() => {
                            this.level.enemies.splice(index, 1);
                        }, 500);

                    }
                }
            });

        } else if (this.character.isColliding(this.level.enemies[this.level.enemies.length - 1])) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.energy);
        }

    }

    checkCoinCollected() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
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
                let percent = (this.character.bottles / this.character.maxBottles) * 100;
                this.bottleBar.setPercentage(percent);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    checkThrowObjects() {
        const now = Date.now();
        const throwCooldown = 400;

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

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        //---space for fixed Objects---
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.healthBarEnboss);
        this.addToMap(this.exitGame);
        this.ctx.translate(this.camera_x, 0);



        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}