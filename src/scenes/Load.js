class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //load all assets
        this.load.path = './assets/'
        this.load.image('card_text', 'postcard_text.png')
        this.load.image('card_img', 'postcard_image.png')

        //stamp profiles
        this.load.image('dopey', 'dopey_profile.png')
        this.load.image('socky', 'socky_profile.png')
        this.load.image('doug', 'doug_profile.png')
        this.load.image('dave', 'dave_profile.png')
        this.load.image('carlos', 'carlos_profile.png')
        this.load.image('miguel', 'miguel_profile.png')
        this.load.image('wolfgang', 'wolfgang_profile.png')
        this.load.image('wilbur', 'wilbur_profile.png')

        //campfire graphics
        this.load.image('campfire', 'campfire_graphic.png')
        this.load.image('X', 'red_x.png')
        this.load.image('O', 'red_o.png')

        //load audio
        this.load.audio('sfx-write1', 'write1.mp3')
        this.load.audio('sfx-write2', 'write2.mp3')
        this.load.audio('card_flip', 'card_flip.mp3')
        this.load.audio('bgm-text', 'Imagho-Camping.mp3')

        //load fonts
        this.load.bitmapFont('lr_font', 'font/Lovely_Rose.png', 'font/Lovely_Rose.xml')

        //load json
        this.load.json('dialog', 'json/dialog.json')

        //walking scenes
        this.load.image('flashlight_img', 'flashlight.png')

        this.load.image('rutherford_stairs', 'rutherford_stairs.png')

    }

    create() {
        //make anims

        //set initial locations for characters using registry (a location can be set as 'dead' to indicate their death)
        this.registry.set({
            socky: 'swamp'
        })

        // proceed once loading completes
        this.scene.start('textScene')
    }
}