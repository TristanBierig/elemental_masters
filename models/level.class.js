class Level {
    enemies;
    clouds;
    backgroundObjects;
    foregroundObjects;
    floor = [];
    // Starts background render from left out of sight
    backgroundStartX = -2160; // -2160 default
    oddBackgroundNeeded = true;


    constructor(enemies, clouds, backgroundObjects, foregroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.foregroundObjects = foregroundObjects;
        this.updateLevel();
        this.expandFloor();
    }


    /**
     * This function sets an Interval to check if there needs to be a new background to be generated
     * 
     */
    updateLevel() {
        setInterval(() => {
            this.keepGenerateBackground();
        }, 1000 / 25);
    }


    /**
     * This function checks if there needs to be a new background depending on the distance the character travelled to the right in relation to the already renderd background
     * 
     */
    keepGenerateBackground() {
        if (world && this.floor[this.floor.length - 1].x - world.character.x < 800) {
            this.expandFloor(true);
        }
        if (world && this.backgroundStartX < world.character.x || world.character.x + 720 > this.backgroundStartX) {
            this.expandBackground();
        }
    }

    /**
    * This function pushes new objects into the this.floor-Array based on whether the character travelled a certain distance to the right. (infinite World generation)
    * 
    * @param {boolean} isNewScreen - This is True when the character travelled a certain distance to the right 
    *                              in relation to the already rendered Background and Floor Sprites X-Coordinates 
    */
    expandFloor(isNewScreen) {
        let oneScreenWidth = 6;
        let tileStart = -720;
        if (isNewScreen) {
            oneScreenWidth + 6;
            tileStart = this.floor[this.floor.length - 1].x;
        }
        for (let i = 0; i < oneScreenWidth; i++) {
            this.floor.push(new Background('img/Background/tileset/ground.png', tileStart, 440, 150, 24),
                new Background('img/Background/tileset/ground_fill.png', tileStart, 458, 400, 26),
            );
            tileStart = tileStart + 140;
        }
    }


    /**
     * This function sets the numbers for the start of the new generated background should be and switches the sky image to a different one on every odd occasion.
     * That is needed because the sky image can not be put together seaminglessly without being flipped
     *  
     */
    expandBackground() {
        let cloudHeight = Math.floor(Math.random() * 1);
        let newStartSky = this.backgroundStartX + 719;
        let newStartMountain = this.backgroundStartX + 717;

        if (this.oddBackgroundNeeded) {
            this.generateOddBackground(newStartMountain, cloudHeight, newStartSky);
        } else {
            this.generateEvenBackground(newStartMountain, cloudHeight, newStartSky);
        }
        this.backgroundStartX = newStartSky;
    }


    /**
     * This functions pushes new background Objects into the backgroundObject-Array from where they get renderd
     * 
     * @param {integer} newStartMountain - X-coordinates where the image needs to start
     * @param {integer} cloudHeight - X-coordinates where the image needs to start
     * @param {integer} newStartSky - X-coordinates where the image needs to start
     */
    generateOddBackground(newStartMountain, cloudHeight, newStartSky) {
        this.backgroundObjects.push(
            new Background('img/Background/background/sky_odd.png', newStartSky, 0),
            new Background('img/Background/background/cloud.png', newStartSky, cloudHeight, 720, 150),
            new Background('img/Background/background/mountain2.png', newStartMountain, 150, 720, 200),
            new Background('img/Background/background/mountain.png', newStartMountain, 80, 720, 400)
        );
        this.oddBackgroundNeeded = false;
    }


    /**
     * This functions pushes new background Objects into the backgroundObject-Array from where they get renderd
     * 
     * @param {integer} newStartMountain - X-coordinates where the image needs to start
     * @param {integer} cloudHeight - X-coordinates where the image needs to start
     * @param {integer} newStartSky - X-coordinates where the image needs to start
     */
    generateEvenBackground(newStartMountain, cloudHeight, newStartSky) {
        this.backgroundObjects.push(
            new Background('img/Background/background/sky.png', newStartSky, 0),
            new Background('img/Background/background/cloud.png', newStartSky, cloudHeight, 720, 150),
            new Background('img/Background/background/mountain2.png', newStartMountain, 150, 720, 200),
            new Background('img/Background/background/mountain.png', newStartMountain, 80, 720, 400)
        );
        this.oddBackgroundNeeded = true;
    }
}