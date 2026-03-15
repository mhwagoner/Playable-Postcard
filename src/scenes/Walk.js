class Walk extends Phaser.Scene {
    constructor() {
        super("walkScene")
    }

    init() {
        this.FAR_LEFT = config.width / 6
        this.LEFT = config.width / 3
        this.CENTER_X = config.width / 2
        this.RIGHT = config.width*2 / 3
        this.FAR_RIGHT = config.width*5 / 6

        this.TOP = config.height / 6
        this.UP = config.height / 3
        this.CENTER_Y = config.height / 2
        this.DOWN = config.height*2 / 3
        this.BOTTOM = config.height*5 / 6

    }

    create() {
        this.cardBack = this.add.image(0, 0, 'card_border').setOrigin(0).setDepth(11)
        this.flashImage = this.registry.get('character') + '_flash'
        this.flashlight = this.physics.add.sprite(config.width/2, config.height/2, this.flashImage).setOrigin(0.5).setDepth(10).setScale(1)

        //initialize first scene
        this.sceneElements = this.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: true
        })

        this.currScene = ''
        this.advanceScene('merrill_choice')
        this.deathTimer = 500
        this.sfxPlayed = false

        this.deathText = this.add.bitmapText(config.width/2, config.height/2, 'lr_font', '', 40).setOrigin(0.5).setDepth(12)
        this.deathText.maxWidth = 800

        //this.add.image(this.LEFT, this.BOTTOM, 'arrow')

    }

    update() {

        //move flashlight sprite IF certain distance away from pointer
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) <= 15 || Math.abs(this.flashlight.y - this.input.activePointer.y) <= 15){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 0)
        }
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) > 15 || Math.abs(this.flashlight.y - this.input.activePointer.y) > 15){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 500)
        }

        if(this.currScene == 'g'){
            this.deathText.text = "A tree fell on you and knocked you out! Your body was cleared away by a groundskeeper the next morning.       GAME OVER"
            this.playSFX('sfx-tree')
            /*let sfxPlaying = false
            if(!sfxPlaying) {
                sfxPlaying = true
                //this.sound.play('sfx-write2')
            }
            //timer to death message
            if(this.deathTimer > 0){
                this.deathTimer--
            }else{
                this.deathText.text = "A tree fell on you and knocked you out!"
            }*/
        } else if (this.currScene == 'g'){
            this.deathText.text = "You, the playtester, were stabbed by a hidden goblin! You're dead! How are you even reading this? GAME OVER."
            this.playSFX('sfx-knife')
            /*timer to death message
            if(this.deathTimer > 0){
                this.deathTimer--
            }else{
                this.deathText.text = "A tree fell on you and knocked you out!"
            }*/
        }
    }

    advanceScene(nextScene) {
        this.sceneElements.clear(true, true)

        this.currScene = nextScene

        //play footstep sfx
        let footstepNum = Phaser.Math.Between(1,3)
        this.sound.play('sfx-footstep' + footstepNum)
        
        //set background image
        let nextSceneBackground = this.add.image(0, 0, nextScene).setOrigin(0)
        this.sceneElements.add(nextSceneBackground)
        
        /*ARROWS TO MOVE BETWEEN AREAS:
        -add arrow image
        -make arrow interactive
        -on pointerdown, trigger this.scene() with next area name as argument
        -up to two arrows
        */

        //add arrow(s)
        if(this.currScene == 'merrill_choice'){
            //arrow 1
            this.arrow1 = this.add.image(200, 150, 'arrow')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('trees')
            })
            
            //arrow 2
            this.arrow2 = this.add.image(700, 400, 'arrow')
            this.arrow2.setInteractive()
            this.arrow2.on('pointerdown', () => {
                this.advanceScene('merrill_entrance')
            })
            
        } else if (this.currScene == 'trees'){
            //arrow 1
            this.arrow1 = this.add.image(300, 300, 'arrow')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('trees_death')
            })

        } else if (this.currScene == 'merrill_entrance'){
            //arrow 1
            this.arrow1 = this.add.image(300, 400, 'arrow')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('merrill_hallway')
            })

        } else if (this.currScene == 'merrill_hallway'){
            //arrow 1
            this.arrow1 = this.add.image(450, 500, 'arrow')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('classroom_entrance')
            })

        } else if (this.currScene == 'classroom_entrance'){
            //arrow 1
            this.arrow1 = this.add.image(100, 300, 'arrow')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('classroom')
            })

        } else if (this.currScene == 'classroom'){
            //death
            this.deathText.text = "You, the playtester, were stabbed by a hidden goblin! You're dead! How are you even reading this? GAME OVER."            
            this.killActiveCharacter('sfx-knife')

        } else if (this.currScene == 'trees_death'){
            //death
            this.deathText.text = "A tree fell on you and knocked you out! Your body was cleared away by a groundskeeper the next morning.       GAME OVER"
            this.killActiveCharacter('sfx-tree')
        }

        this.sceneElements.add(this.arrow1)
        this.sceneElements.add(this.arrow2)
    }

    killActiveCharacter(sfxKey){
        this.flashlight.setTexture('eyes').setScale(0.7)
        this.registry.set(this.registry.get('character'), 'dead')
        //console.log(this.registry.get('character'))
        //console.log(this.registry.get(this.registry.get('character')))

        if (this.sfxPlayed == false){
            this.sound.play(sfxKey)
            this.sfxPlayed = true
        }
    }
}