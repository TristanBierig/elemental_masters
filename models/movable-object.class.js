class MovableObject extends DrawableObject {
    speed;
    otherDirection = false;
    speedY = 0;
    accelertion = 1; // 1 default
    lifePoints = 100;

    animationInterval;
    movementInterval;
    animationStatus;
    movementStatus;

    //Defines the hitbox
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    /**
     * 
     * @param {boolean} spellCasted -This param is always true and only given from a throwableObject
     */
    applyGravitiy(spellCasted) {
        // Applys Gravitiy just for character
        if (!spellCasted) {
            setInterval(() => {
                // debugger
                if (this.isAirborne() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.accelertion;
                    // Prevents Character from falling to low underneath ground level
                    if (this.y > 205) {
                        this.y = 205
                    }
                    // Throttles Speed at a point where collision with enemy is still triggered (no infinite acceleration on falling)
                    if (this.speedY < - 18) {
                        this.speedY = -18;
                    }
                }
            }, 1000 / 25);
        }

        // Applys gravitiy to throwableObjects (lets them fall underneath ground level)
        if (spellCasted) {
            setInterval(() => {
                // debugger
                this.y -= this.speedY;
                this.speedY -= this.accelertion;
            }, 1000 / 25);
        }
    }


    isAirborne() {
        return this.y < 205;
    }


    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.bottom;
    }


    gettingHit() {
        this.lifePoints -= 1; // Default 1
        if (this.lifePoints <= 0) {
            this.lifePoints = 0
        }
    }


    isDead() {
        return this.lifePoints <= 0;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    shoot() {

    }

    jump() {
        this.speedY = 15; // default 17
    }


    /**
     * This function stops any given Interval
     * 
     * @param {interval} Interval - Expects an Interval ID to be stopped
     */
    stopInterval(Interval) {
        clearInterval(Interval);
    }


    /**
     * This function iterates over a passed-in Array 
     * 
     * @param {Array} images - Expects an array with all the paths to a particual animation 
     */
    playAnimation(images) {
        // debugger
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}