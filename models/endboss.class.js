class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -45;
    x = 2500;
    bossActive = false;
    energy = 100;
    isWalking = false;
    isInAlert = false;
    isAttacking = false;
    collisionOffsetX = 50;
    collisionOffsetY = 0;

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.5;
        this.applyGravity();
        this.startPhaseCycle();
        this.animate();
    }

    hit() {
        super.hit();
        if (this.isDead()) {
            this.world.healthBarEnboss.setPercentage(0);
            this.world.healthBarEnboss.img.src = 'img/7_statusbars/2_statusbar_endboss/blue/blue0_win.png';
            setTimeout(() => {
                showWinnerScreen();
            }, 500);
        } else {
            this.world.healthBarEnboss.setPercentage(this.energy);
        }
    }

    animate() {
        setInterval(() => {
            if (this.bossActive && this.isWalking) {
                this.moveLeft();
            } else if (this.bossActive && this.isAttacking) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.playAnimations();
    }

    playAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isInAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    startPhaseCycle() {
        this.bossActive = true;
        let phase = 0;
        setInterval(() => {
            this.resetPhases();

            if (phase === 0) {
                this.walk();
            } else if (phase === 1) {
                this.alert();
            } else if (phase === 2) {
                this.attack();
            }

            phase = (phase + 1) % 3;
        }, 4000);
    }

    resetPhases() {
        this.isWalking = false;
        this.isInAlert = false;
        this.isAttacking = false;
        this.speed = 0.5;
    }

    walk() {
        this.isWalking = true;
    }

    alert() {
        this.isInAlert = true;
    }

    attack() {
        this.isAttacking = true;
        this.speed = 2;

        if (this.isAboveGround()) return;
        this.speedY = 40;
        this.applyGravity();
    }
}
