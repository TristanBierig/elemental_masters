class StatusBar extends DrawableObject {
    percentage = 100;
    statusbarFrame;
    StatusbarIcon;
    IMAGES_BAR = [
        'img/UI/ingame_bars/bar_green/tile055.png',
        'img/UI/ingame_bars/bar_green/tile054.png',
        'img/UI/ingame_bars/bar_green/tile053.png',
        'img/UI/ingame_bars/bar_green/tile052.png',
        'img/UI/ingame_bars/bar_green/tile051.png',
        'img/UI/ingame_bars/bar_green/tile050.png'
    ];

    ICONS = [
        'img/Collectables/health/tile000.png',
        'img/Collectables/health/tile001.png',
        'img/Collectables/health/tile002.png',
        'img/Collectables/health/tile003.png',
        'img/Collectables/health/tile004.png',
        'img/Collectables/health/tile005.png',
        'img/Collectables/health/tile006.png',
        'img/Collectables/health/tile007.png'
    ]


    constructor() {
        // debugger

        super().loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 0;
        this.height = 32;
        this.width = 200;
        this.statusbarFrame = new StatusbarFrame(this.x, this.y, this.height, this.width, 'img/UI/ingame_bars/frames/frame_grey.png');
        this.statusbarIcon = new StatusbarIcon(this.y, this.ICONS);

        // debugger
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