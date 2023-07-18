class Character extends MovableObject {
    height = 256;
    width = 576;
    x = -200;
    y = 150; // 205 Ground value
    IMAGES_WALKING = [
        'img/Character/png/run/run_1.png',
        'img/Character/png/run/run_2.png',
        'img/Character/png/run/run_3.png',
        'img/Character/png/run/run_4.png',
        'img/Character/png/run/run_5.png',
        'img/Character/png/run/run_6.png',
        'img/Character/png/run/run_7.png',
        'img/Character/png/run/run_8.png'
    ];
    //world;
    speed = 2.5;
    walking_sound = new Audio('audio/sound_effects/foodsteps_grass.mp3');

    constructor() {
        super().loadImage('img/Character/png/run/run_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.applyGravitiy();
    }

    animate() {
        this.walking_sound.pause();
        // Move Horizontal
        setInterval(() => {
            if (world && world.keyboard.RIGHT == true && this.x < world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (world && world.keyboard.LEFT == true && this.x > -750) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            world.camera_x = -this.x - 150;
            console.log(this.x);
        }, 1000 / 60);

        // Run Animation
        setInterval(() => {
            if (world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 80);
    }


    jump() {

    }
}