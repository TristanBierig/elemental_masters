class StatusBar extends DrawableObject {
    percentage = 100;
    statusbarFrame;
    StatusbarIcon;
    bossBar;

    ICONS = allImages.ingameUI.icons.healthPot;
    IMAGES_BAR = allImages.ingameUI.statusbar.health;

    constructor(x, width, bossBar) {
        super().loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 0;
        this.height = 32;
        this.width = 200;
        this.bossBar = bossBar
        if (x && width && this.bossBar) {
            this.x = x;
            this.width = width;
            this.otherDirection = true;
            this.percentage = 2000;
        }
        this.statusbarFrame = new StatusbarFrame(this.x, this.y, this.height, this.width, 'img/UI/ingame_bars/frames/frame_grey.png');
        this.statusbarIcon = new StatusbarIcon(0, this.y, 'LIFE');


        setInterval(() => {
            this.setPercentage();
        }, 100);
    }


    /**
     * This function sets the progress of the status bar depending on the returning index
     * 
     */
    setPercentage() {
        if (!this.bossBar) {
            let path = this.IMAGES_BAR[this.resolveCharacterBarIndex()];
            this.img = this.imageCache[path];
        } else {
            let path = this.IMAGES_BAR[this.resolveBossBarIndex()];
            this.img = this.imageCache[path];
        }
    }


    /**
     * This function returns a different index depending on the percentage (higher percentage = image with filled bar)
     * 
     * @returns the index of the image that should be used
     */
    resolveCharacterBarIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }


    /**
     * This function returns a different index depending on the percentage (higher percentage = image with filled bar)
     * 
     * @returns the index of the image that should be used
     */
    resolveBossBarIndex() {
        if (this.percentage > 1600) {
            return 5;
        } else if (this.percentage > 1200) {
            return 4;
        } else if (this.percentage > 800) {
            return 3;
        } else if (this.percentage > 400) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }
}