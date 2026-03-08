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
        
        //campfire graphics
        this.load.image('campfire', 'campfire_graphic.png')
        this.load.image('X', 'red_x.png')
        this.load.image('O', 'red_o.png')


        //load fonts
        this.load.bitmapFont('lr_font', 'font/Lovely_Rose.png', 'font/Lovely_Rose.xml')

        //load json
        this.load.json('dialog', 'json/dialog.json')

    }

    create() {
        //make anims

        //set initial locations for characters using registry (a location can be set as 'dead' to indicate their death)
        this.registry.set({
            socky: 'forest'
        })

        // proceed once loading completes
        this.scene.start('campfireScene')
    }
}