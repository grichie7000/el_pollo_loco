class ThrowableObject extends MoveableObject {

    collisionOffsetX = 30;
    collisionOffsetY = -10;


    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.hasHit = false;
        this.splashImages = [
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ];

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.splashImages);
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();

        this.throwInterval = setInterval(() => {
            this.x += 10;

            if (this.y > 350) {
                clearInterval(this.throwInterval);
                this.playSplashAnimation();
            }
        }, 25);
    }

    playSplashAnimation() {
        this.currentImage = 0;


        let splashInterval = setInterval(() => {
            this.playAnimation(this.splashImages);

            if (this.currentImage >= this.splashImages.length) {
                clearInterval(splashInterval);

                let index = world.throwableObjects.indexOf(this);
                if (index > -1) {
                    world.throwableObjects.splice(index, 1);
                }
            }
        }, 100);
    }

    handleHit() {
        if (!this.hasHit) {
            this.hasHit = true;

            clearInterval(this.throwInterval); 
            this.speedY = 0;                    
            this.playSplashAnimation();        
        }
    }
}