class Walk extends Phaser.Scene {
    constructor() {
        super("walkScene")
    }

    create() {
        this.cardBack = this.add.image(0, 0, 'card_img').setOrigin(0)
        this.flashlight = this.physics.add.sprite(0, 0, 'flashlight_img').setOrigin(0.5).setDepth(10)

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

        this.deathText = this.add.bitmapText(config.width/2, config.height/2, 'lr_font', '', 40).setOrigin(0.5).setDepth(11)
        this.deathText.maxWidth = 800
    }

    update() {

        //move flashlight sprite IF certain distance away from pointer
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) <= 5 || Math.abs(this.flashlight.y - this.input.activePointer.y) <= 5){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 0)
        }
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) > 5 || Math.abs(this.flashlight.y - this.input.activePointer.y) > 5){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 300)
        }

        if(this.currScene == 'trees_death'){
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
        } else if (this.currScene == 'classroom'){
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

        console.log(this.sceneElements)
        this.currScene = nextScene

        //play footstep sfx
        let footstepNum = Phaser.Math.Between(1,3)
        this.sound.play('sfx-footstep' + footstepNum)
        
        //set background image
        let nextSceneBackground = this.add.image(25, 25, nextScene).setOrigin(0).setScale(0.9)
        this.sceneElements.add(nextSceneBackground)
        
        //add arrow(s)
        if(nextScene == 'merrill_choice'){
            this.arrow1 = this.add.image(200, 150, 'arrow').setAngle(-90).setScale(0.05)
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('trees')
                console.log("trees")
            })
            
            this.arrow2 = this.add.image(700, 400, 'arrow').setAngle(-45).setScale(0.05)
            this.arrow2.setInteractive()
            this.arrow2.on('pointerdown', () => {
                this.advanceScene('merrill_entrance')
                console.log("merril building")
            })
            
        } else if (nextScene == 'trees'){
            this.arrow1 = this.add.image(300, 300, 'arrow').setAngle(0).setScale(0.05)
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('trees_death')
                console.log("trees_death")
            })
        } else if (nextScene == 'merrill_entrance'){
            this.arrow1 = this.add.image(300, 400, 'arrow').setAngle(0).setScale(0.05)
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('merrill_hallway')
                console.log("merrill_hallway")
            })
        } else if (nextScene == 'merrill_hallway'){
            this.arrow1 = this.add.image(450, 500, 'arrow').setAngle(-90).setScale(0.05)
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('classroom_entrance')
                console.log("classroom_entrance")
            })
        } else if (nextScene == 'classroom_entrance'){
            this.arrow1 = this.add.image(100, 300, 'arrow').setAngle(0).setScale(0.05)
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('classroom')
                console.log("classroom")
            })
        }

        this.sceneElements.add(this.arrow1)
        this.sceneElements.add(this.arrow2)
    }

    playSFX(sfxKey){
        if (this.sfxPlayed == false){
            this.sound.play(sfxKey)
            this.sfxPlayed = true
        }
    }
}