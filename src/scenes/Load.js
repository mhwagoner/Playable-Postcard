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
        this.load.image('heebee', 'heebee_profile.png')
        this.load.image('shadow', 'shadow_profile.png')

        //campfire graphics
        this.load.image('campfire', 'campfire_graphic.png')
        this.load.image('X', 'red_x.png')
        this.load.image('O', 'red_o.png')

        //load audio
        this.load.audio('sfx-write1', 'write1.mp3')
        this.load.audio('sfx-write2', 'write2.mp3')
        this.load.audio('sfx-card_flip', 'card_flip.mp3')
        this.load.audio('bgm-text', 'Imagho-Camping.mp3')
        this.load.audio('sfx-footstep1', 'footstep1.mp3')
        this.load.audio('sfx-footstep2', 'footstep2.mp3')
        this.load.audio('sfx-footstep3', 'footstep3.mp3')
        this.load.audio('sfx-tree', 'tree.mp3')
        this.load.audio('sfx-knife', 'knife.mp3')
        this.load.audio('sfx-drown', 'drowned.mp3')
        this.load.audio('sfx-suffocated', 'suffocated.mp3')
        this.load.audio('sfx-crushed', 'crushed.mp3')
        this.load.audio('sfx-burned', 'burned.mp3')
        this.load.audio('sfx-fall', 'fall.mp3')
        this.load.audio('sfx-shot', 'shot.mp3')

        //load fonts
        this.load.bitmapFont('lr_font', 'font/Lovely_Rose.png', 'font/Lovely_Rose.xml')

        //load json
        this.load.json('dialog', 'json/dialog.json')

        //walking scenes
        this.load.image('arrow_up', 'arrow_up.png')
        this.load.image('arrow_down', 'arrow_down.png')
        this.load.image('eyes', 'eye_light.png')

        this.load.image('socky_flash', 'flashlight_socky.png')
        this.load.image('doug_flash', 'flashlight_doug.png')
        this.load.image('dopey_flash', 'flashlight_dopey.png')
        this.load.image('dave_flash', 'flashlight_dave.png')
        this.load.image('carlos_flash', 'flashlight_carlos.png')
        this.load.image('miguel_flash', 'flashlight_miguel.png')
        this.load.image('wolfgang_flash', 'flashlight_wolfgang.png')
        this.load.image('wilbur_flash', 'flashlight_wilbur.png')

        //backgrounds
        this.load.path = './assets/backgrounds/'
        this.load.image('cabin', 'cabin.png')
        this.load.image('cabin_interior', 'cabin_interior.png')
        this.load.image('cabin_exterior', 'cabin_exterior.png')
        this.load.image('cliff', 'cliff.png')
        this.load.image('dock', 'dock.png')
        this.load.image('field_1', 'field_1.png')
        this.load.image('field_2', 'field_2.png')
        this.load.image('field_3', 'field_3.png')
        this.load.image('field_4', 'field_4.png')
        this.load.image('field_5', 'field_5.png')
        this.load.image('field_6', 'field_6.png')
        this.load.image('field_7', 'field_7.png')
        this.load.image('field_8', 'field_8.png')
        this.load.image('fire', 'fire.png')
        this.load.image('forest_1', 'forest_1.png')
        this.load.image('forest_2', 'forest_2.png')
        this.load.image('forest_3', 'forest_3.png')
        this.load.image('forest_4', 'forest_4.png')
        this.load.image('forest_5', 'forest_5.png')
        this.load.image('forest_6', 'forest_6.png')
        this.load.image('forest_7', 'forest_7.png')
        this.load.image('forest_8', 'forest_8.png')
        this.load.image('forest_9', 'forest_9.png')
        this.load.image('forest_10', 'forest_10.png')
        this.load.image('forest_11', 'forest_11.png')
        this.load.image('forest_12', 'forest_12.png')
        this.load.image('forest_13', 'forest_13.png')
        this.load.image('lake', 'lake.png')
        this.load.image('lighthouse', 'lighthouse.png')
        this.load.image('lighthouse_door', 'lighthouse_door.png')
        this.load.image('mess_hall', 'mess_hall.png')
        this.load.image('outhouse', 'outhouse.png')
        this.load.image('shore_1', 'shore_1.png')
        this.load.image('shore_2', 'shore_2.png')
        this.load.image('stream', 'stream.png')
        this.load.image('tent_1', 'tent_1.png')
        this.load.image('tent_2', 'tent_2.png')
        this.load.image('tent_3', 'tent_3.png')
        this.load.image('waterfall', 'waterfall.png')


    }

    create() {
        //make anims

        //set initial locations for characters using registry (a location can be set as 'dead' to indicate their death)
        this.registry.set({
            character: '',
            dialogConvo: 0,
            socky: 'tent_1',
            doug: 'tent_1',
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