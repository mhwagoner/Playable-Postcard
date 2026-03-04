class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //load all assets
    }

    create() {
        //make anims

        // proceed once loading completes
        this.scene.start('playScene')
    }
}