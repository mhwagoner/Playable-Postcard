class Campfire extends Phaser.Scene {
    constructor() {
        super("campfireScene")
    }

    create() {
        //load background image
        this.background = this.add.image(0, 0, 'campfire').setOrigin(0,0)
    }

}