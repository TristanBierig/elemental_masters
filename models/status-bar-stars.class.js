class StatusBarStars extends DrawableObject {
    percentage = 0;
    statusbarFrame;
    statusbarIcon;

    ICONS = allImages.ingameUI.icons.stars;
    IMAGES_BAR = allImages.ingameUI.statusbar.stars ;

    constructor() {
        // debugger
        super();
        this.loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 64;
        this.height = 32;
        this.width = 200;
        this.statusbarFrame = new StatusbarFrame(this.x, this.y, this.height, this.width, 'img/UI/ingame_bars/frames/frame_grey.png');
        this.statusbarIcon = new StatusbarIcon(0, this.y, 'STAR');

        setInterval(() => {
            this.setPercentage();
        }, 100);
    }


    setPercentage() {
        let path = this.IMAGES_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
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
}