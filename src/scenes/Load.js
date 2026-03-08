class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //load all assets
        this.load.path = './assets/'
        this.load.image('card_text', 'postcard_text.png')
        this.load.image('card_img', 'postcard_image.png')
        this.load.image('worstBird', 'worst_bird.png')
        this.load.image('bottom', 'socky.png')
        this.load.image('dialogbox', 'dialogbox.png')


        //load fonts
        this.load.bitmapFont('lr_font', 'font/Lovely_Rose.png', 'font/Lovely_Rose.xml')

        //load json
        this.load.json('dialog', 'json/dialog.json')

    }

    create() {
        //make anims

        // proceed once loading completes
        this.scene.start('textScene')
    }
}