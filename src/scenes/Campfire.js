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
    }

    create() {
        //load background image
        this.background = this.add.image(0, 0, 'campfire').setOrigin(0,0)

        //SOCKY
        if(this.registry.get('socky') == 'dead'){
            //add uninteractive red X
            this.SOCKY_ICON = this.add.image(this.SOCKY_X, this.SOCKY_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.SOCKY_ICON)

        } else if (this.registry.get('socky') != 'out'){
            //add interactive red O
            this.SOCKY_ICON = this.add.image(this.SOCKY_X, this.SOCKY_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.SOCKY_ICON)

            this.SOCKY_ICON.setInteractive()
            this.SOCKY_ICON.on('pointerover', () => {this.SOCKY_ICON.setTint(0x333333)})
            this.SOCKY_ICON.on('pointerout', () => {this.SOCKY_ICON.clearTint()})
            
            //socky chosen, go to walking scene
            this.SOCKY_ICON.on('pointerdown', () => {
                this.registry.set('character', 'socky')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //DOUG
        if(this.registry.get('doug') == 'dead'){
            //add uninteractive red X
            this.DOUG_ICON = this.add.image(this.DOUG_X, this.DOUG_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DOUG_ICON)

        } else if (this.registry.get('doug') != 'out'){
            //add interactive red O
            this.DOUG_ICON = this.add.image(this.DOUG_X, this.DOUG_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DOUG_ICON)

            this.DOUG_ICON.setInteractive()
            this.DOUG_ICON.on('pointerover', () => {this.DOUG_ICON.setTint(0x333333)})
            this.DOUG_ICON.on('pointerout', () => {this.DOUG_ICON.clearTint()})
            
            //doug chosen, go to walking scene
            this.DOUG_ICON.on('pointerdown', () => {
                this.registry.set('character', 'doug')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //DOPEY
        if(this.registry.get('dopey') == 'dead'){
            //add uninteractive red X
            this.DOPEY_ICON = this.add.image(this.DOPEY_X, this.DOPEY_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DOPEY_ICON)

        } else if (this.registry.get('dopey') != 'out'){
            //add interactive red O
            this.DOPEY_ICON = this.add.image(this.DOPEY_X, this.DOPEY_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DOPEY_ICON)

            this.DOPEY_ICON.setInteractive()
            this.DOPEY_ICON.on('pointerover', () => {this.DOPEY_ICON.setTint(0x333333)})
            this.DOPEY_ICON.on('pointerout', () => {this.DOPEY_ICON.clearTint()})
            
            //dopey chosen, go to walking scene
            this.DOPEY_ICON.on('pointerdown', () => {
                this.registry.set('character', 'dopey')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //DAVE
        if(this.registry.get('dave') == 'dead'){
            //add uninteractive red X
            this.DAVE_ICON = this.add.image(this.DAVE_X, this.DAVE_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DAVE_ICON)

        } else if (this.registry.get('dave') != 'out'){
            //add interactive red O
            this.DAVE_ICON = this.add.image(this.DAVE_X, this.DAVE_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.DAVE_ICON)

            this.DAVE_ICON.setInteractive()
            this.DAVE_ICON.on('pointerover', () => {this.DAVE_ICON.setTint(0x333333)})
            this.DAVE_ICON.on('pointerout', () => {this.DAVE_ICON.clearTint()})
            
            //dave chosen, go to walking scene
            this.DAVE_ICON.on('pointerdown', () => {
                this.registry.set('character', 'dave')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //CARLOS
        if(this.registry.get('carlos') == 'dead'){
            //add uninteractive red X
            this.CARLOS_ICON = this.add.image(this.CARLOS_X, this.CARLOS_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.CARLOS_ICON)

        } else if (this.registry.get('carlos') != 'out'){
            //add interactive red O
            this.CARLOS_ICON = this.add.image(this.CARLOS_X, this.CARLOS_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.CARLOS_ICON)

            this.CARLOS_ICON.setInteractive()
            this.CARLOS_ICON.on('pointerover', () => {this.CARLOS_ICON.setTint(0x333333)})
            this.CARLOS_ICON.on('pointerout', () => {this.CARLOS_ICON.clearTint()})
            
            //carlos chosen, go to walking scene
            this.CARLOS_ICON.on('pointerdown', () => {
                this.registry.set('character', 'carlos')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //MIGUEL
        if(this.registry.get('miguel') == 'dead'){
            //add uninteractive red X
            this.MIGUEL_ICON = this.add.image(this.MIGUEL_X, this.MIGUEL_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.MIGUEL_ICON)

        } else if (this.registry.get('miguel') != 'out'){
            //add interactive red O
            this.MIGUEL_ICON = this.add.image(this.MIGUEL_X, this.MIGUEL_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.MIGUEL_ICON)

            this.MIGUEL_ICON.setInteractive()
            this.MIGUEL_ICON.on('pointerover', () => {this.MIGUEL_ICON.setTint(0x333333)})
            this.MIGUEL_ICON.on('pointerout', () => {this.MIGUEL_ICON.clearTint()})
            
            //miguel chosen, go to walking scene
            this.MIGUEL_ICON.on('pointerdown', () => {
                this.registry.set('character', 'miguel')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //WOLFGANG
        if(this.registry.get('wolfgang') == 'dead'){
            //add uninteractive red X
            this.WOLFGANG_ICON = this.add.image(this.WOLFGANG_X, this.WOLFGANG_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.WOLFGANG_ICON)

        } else if (this.registry.get('wolfgang') != 'out'){
            //add interactive red O
            this.WOLFGANG_ICON = this.add.image(this.WOLFGANG_X, this.WOLFGANG_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.WOLFGANG_ICON)

            this.WOLFGANG_ICON.setInteractive()
            this.WOLFGANG_ICON.on('pointerover', () => {this.WOLFGANG_ICON.setTint(0x333333)})
            this.WOLFGANG_ICON.on('pointerout', () => {this.WOLFGANG_ICON.clearTint()})
            
            //wolfgang chosen, go to walking scene
            this.WOLFGANG_ICON.on('pointerdown', () => {
                this.registry.set('character', 'wolfgang')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }

        //WILBUR
        if(this.registry.get('wilbur') == 'dead'){
            //add uninteractive red X
            this.WILBUR_ICON = this.add.image(this.WILBUR_X, this.WILBUR_Y, 'X').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.WILBUR_ICON)

        } else if (this.registry.get('wilbur') != 'out'){
            //add interactive red O
            this.WILBUR_ICON = this.add.image(this.WILBUR_X, this.WILBUR_Y, 'O').setScale(0.05).setOrigin(0.5)
            this.icons.add(this.WILBUR_ICON)

            this.WILBUR_ICON.setInteractive()
            this.WILBUR_ICON.on('pointerover', () => {this.WILBUR_ICON.setTint(0x333333)})
            this.WILBUR_ICON.on('pointerout', () => {this.WILBUR_ICON.clearTint()})
            
            //wilbur chosen, go to walking scene
            this.WILBUR_ICON.on('pointerdown', () => {
                this.registry.set('character', 'wilbur')
                this.icons.clear(true, true)
                this.scene.start('walkScene')
            })
        }
    }

}