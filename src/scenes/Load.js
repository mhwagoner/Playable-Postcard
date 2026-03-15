class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //load all assets
        this.load.path = './assets/'
        this.load.image('card_text', 'postcard_text.png')
        this.load.image('card_img', 'postcard_image.png')
        this.load.image('card_border', 'card_back_border.png')

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
        this.load.audio('sfx-footstep1', 'footstep1.mp3')
        this.load.audio('sfx-footstep2', 'footstep2.mp3')
        this.load.audio('sfx-footstep3', 'footstep3.mp3')
        this.load.audio('sfx-tree', 'tree.mp3')
        this.load.audio('sfx-knife', 'knife.mp3')

        //load fonts
        this.load.bitmapFont('lr_font', 'font/Lovely_Rose.png', 'font/Lovely_Rose.xml')

        //load json
        this.load.json('dialog', 'json/dialog.json')

        //walking scenes
        this.load.image('arrow', 'arrow.png')
        this.load.image('eyes', 'eye_light.png')

        this.load.image('socky_flash', 'flashlight_socky.png')
        this.load.image('doug_flash', 'flashlight_doug.png')
        this.load.image('dopey_flash', 'flashlight_dopey.png')
        this.load.image('dave_flash', 'flashlight_dave.png')
        this.load.image('carlos_flash', 'flashlight_carlos.png')
        this.load.image('miguel_flash', 'flashlight_miguel.png')
        this.load.image('wolfgang_flash', 'flashlight_wolfgang.png')
        this.load.image('wilbur_flash', 'flashlight_wilbur.png')

        this.load.image('merrill_choice', 'merrill_choice.png')
        this.load.image('classroom_entrance', 'classroom_entrance.png')
        this.load.image('classroom', 'classroom.png')
        this.load.image('trees', 'trees.png')
        this.load.image('trees_death', 'trees_death.png')
        this.load.image('merrill_entrance', 'merrill_entrance.png')
        this.load.image('merrill_hallway', 'merrill_hallway.png')

    }

    create() {
        //make anims

        //set initial locations for characters using registry (a location can be set as 'dead' to indicate their death)
        this.registry.set({
            character: '',
            socky: 'y',
            doug: 'out',
            dopey: 'out',
            dave: 'out',
            miguel: 'out',
            carlos: 'out',
            wolfgang: 'out',
            wilbur: 'out'
        })

        // proceed once loading completes
        this.scene.start('campfireScene')
    }
}