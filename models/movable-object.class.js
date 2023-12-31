class MovableObject extends DrawableObject {
    speed;
    speedY = 0;
    accelertion = 1; // 1 default

    lifePoints = 100;
    isTakingHit;
    isKilled = false;

    animationInterval;
    animationIntervalTransform;
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
    applyGravitiy(spellCasted, element) {
        // Applys Gravitiy just for character
        if (!spellCasted) {
            this.gravityForCharacter(element);
        } else {
            // Lets projectiles fall underneath ground level
            this.gravityForSpells();
        }
    }


    /**
     * This function sets an Interval to check continuously if the character is in the air and lets him fall down to ground level
     * Earth Character is validated seperatly beacuse of a different image it needs to be set on a different Y-coordinate 
     * 
     * @param {string} element - Defines the element of the choosen character
     */
    gravityForCharacter(element) {
        setInterval(() => {
            if (this.y < 205 || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelertion;
                if (this.y > 205 && element == 'Earth') {
                    this.y = 205
                }
                if (this.y > 192 && element != 'Earth') {
                    this.y = 192
                }
                // Throttles Speed at a point where collision with enemy is still triggered (no infinite acceleration on falling)
                if (this.speedY < - 17) {
                    this.speedY = -17;
                }
            }
        }, 1000 / 25);
    }


    /**
     * This function applys the same garvitiy to spells as it is been added to the character with the exception that spells can fall through the ground and have no accelerating threshhold
     * 
     */
    gravityForSpells() {
        setInterval(() => {
            this.y -= this.speedY;
            this.speedY -= this.accelertion;
        }, 1000 / 25);
    }


    isAirborne() {
        return this.y < 192;
    }

    
    /**
     * This function checks if the calling object (this) collides with another movable Object passed in as a param 
     * 
     * @param {Object} mo - Takes a movable object as param
     * @returns - true or false
     */
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


    jump() {
        this.speedY = 15; // default 15
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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}