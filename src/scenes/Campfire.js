class Campfire extends Phaser.Scene {
    constructor() {
        super("campfireScene")
    }

    init() {
        //where character icon sprites will be on the screen
        this.SOCKY_X = 168
        this.SOCKY_Y = 431
        this.SOCKY_ICON

        this.DOUG_X = 770
        this.DOUG_Y = 347
        this.DOUG_ICON

        this.DAVE_X = 600
        this.DAVE_Y = 424
        this.DAVE_ICON

        this.DOPEY_X = 330
        this.DOPEY_Y = 330
        this.DOPEY_ICON

        this.MIGUEL_X = 120
        this.MIGUEL_Y = 262
        this.MIGUEL_ICON

        this.CARLOS_X = 590
        this.CARLOS_Y = 310
        this.CARLOS_ICON

        this.WOLFGANG_X = 730
        this.WOLFGANG_Y = 220
        this.WOLFGANG_ICON

        this.WILBUR_X = 390
        this.WILBUR_Y = 460
        this.Wilbur_ICON

        //group to hold character icons
        this.icons = this.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: true
        })
        
        //preemptively add all the icons to the group
        this.icons.add(this.SOCKY_ICON)
        this.icons.add(this.DOUG_ICON)
        this.icons.add(this.DAVE_ICON)
        this.icons.add(this.DOPEY_ICON)
        this.icons.add(this.WOLFGANG_ICON)
        this.icons.add(this.CARLOS_ICON)
        this.icons.add(this.MIGUEL_ICON)
        this.icons.add(this.CARLOS_ICON)
    }

    create() {
        //load background image
        this.background = this.add.image(0, 0, 'campfire').setOrigin(0,0)

        if(this.registry.socky == 'dead'){
            //add uninteractive red X
            this.SOCKY_ICON = this.add.image(this.SOCKY_X, this.SOCKY_Y, 'X').setScale(0.1).setOrigin(0.5)
        } else if (this.registry.socky != 'out'){
            //add interactive red O
            this.SOCKY_ICON = this.add.image(this.SOCKY_X, this.SOCKY_Y, 'O').setScale(0.1).setOrigin(0.5)
            
        }

        this.background.setInteractive()
        this.background.on('pointerdown', () => {
            console.log("Moved to walk")
            this.scene.start('walkScene')
        })

        //when scene end this.icons.clear(true, true)
    }

}