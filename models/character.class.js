class Character extends MoveableObject {

    height = 300;
    width = 120;
    hitboxOffsetX = 10;
    hitboxOffsetY = 150;
    speed = 10;
    afkTimeInSeconds = 0;
    timeToBeAfk = 200;
    jumpSound = new Sounds('audio/jump.mp3', 0.1)
    walkSound = new Sounds('audio/walking.mp3', 0.1)

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;
    gameOverImage;

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png')
        this.coins = 1;
        this.bottles = 1;
        this.maxBottles = 5;
        this.isJumping = false;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.afkTimeInSeconds = 0;
                this.playWalkingSound();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.afkTimeInSeconds = 0;
                this.playWalkingSound();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.afkTimeInSeconds = 0;
                this.jumpSound.playSound();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        this.playAnimations();

    }


    playAnimations() {

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
                clearAllIntervals();
                setTimeout(() => {
                    gameOver();
                }, 1000);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else if (this.isIdle()) {
                this.playAnimation(this.IMAGES_IDLE)
            } else if (this.isLongIdle()) {
                this.playAnimation(this.IMAGES_LONGIDLE)
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 120);
    }

    playWalkingSound() {
        if (!this.isAboveGround()) {
            this.walkSound.playSound();
        }
    }

    jump() {
        this.speedY = 30;
    }

}