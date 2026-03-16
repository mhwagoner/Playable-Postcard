class Walk extends Phaser.Scene {
    constructor() {
        super("walkScene")
    }

    init() {
        this.COL1 = config.width / 6
        this.COL2 = config.width / 3
        this.COL3 = config.width / 2
        this.COL4 = config.width*2 / 3
        this.COL5 = config.width*5 / 6

        this.ROW1 = config.height / 6
        this.ROW2 = config.height / 3
        this.ROW3 = config.height / 2
        this.ROW4 = config.height*2 / 3
        this.ROW5 = config.height*5 / 6

        this.drowned = true
        this.burned = true
        this.pushed = true
        this.stabbed = true
        this.crushed = true
        this.knockedOut = true
        this.suffocated = true
        this.keyCollected = true

    }

    create() {
        this.cardBorder = this.add.image(0, 0, 'card_border').setOrigin(0).setDepth(11)
        this.flashImage = this.registry.get('character') + '_flash'
        this.flashlight = this.physics.add.sprite(config.width/2, config.height/2, this.flashImage).setOrigin(0.5).setDepth(10).setScale(1)

        //initialize scene elements group to store the background and arrows
        this.sceneElements = this.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            active: true,
            maxSize: -1,
            runChildUpdate: true
        })

        this.dead = false
        this.currScene = ''
        this.sfxPlayed = false
        this.deathText = this.add.bitmapText(config.width/2, config.height/2, 'lr_font', '', 40).setOrigin(0.5).setDepth(12)
        this.deathText.maxWidth = 800

        console.log(this.registry.get(this.registry.get('character')))
        //go to the scene that the chosen character is currently in
        this.advanceScene(this.registry.get(this.registry.get('character')))

        // setup keyboard input
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        //move flashlight sprite IF certain distance away from pointer
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) <= 15 || Math.abs(this.flashlight.y - this.input.activePointer.y) <= 15){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 0)
        }
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) > 15 || Math.abs(this.flashlight.y - this.input.activePointer.y) > 15){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 500)
        }

        if(Phaser.Input.Keyboard.JustDown(cursors.space) && this.dead) {
            this.scene.start('textScene')
        }
    }

    advanceScene(nextScene) {
        this.sceneElements.clear(true, true)
        this.deathText.text = ""

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
        if(this.currScene == 'mess_hall'){
            //arrow 1
            this.arrow1 = this.add.image(COL5, ROW3, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_3')
            })
            
        } else if (this.currScene == 'forest_3'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW3, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_2')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW2, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_4')
            })

        } else if (this.currScene == 'forest_2'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_1')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_3')
            })

        } else if (this.currScene == 'forest_4'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_3')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL4, ROW3, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_1')
            })

        } else if (this.currScene == 'field_1'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_2')
            })

        } else if (this.currScene == 'field_2'){
            //arrow 1
            this.arrow1 = this.add.image(COL4, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_3')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_4')
            })

        } else if (this.currScene == 'field_3'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW3, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('cliff')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_2')
            })

        } else if (this.currScene == 'field_4'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('stream')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_5')
            })

        } else if (this.currScene == 'stream'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('lake')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_4')
            })

        } else if (this.currScene == 'lake'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('dock')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('stream')
            })

        } else if (this.currScene == 'field_5'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_11')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL4, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('tent_1')
            })

        } else if (this.currScene == 'tent_1'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('tent_2')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL4, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_5')
            })

        } else if (this.currScene == 'tent_2'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('tent_1')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('tent_3')
            })

        } else if (this.currScene == 'forest_5'){
            //arrow 1
            this.arrow1 = this.add.image(COL4, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('cabin')
            })

        } else if (this.currScene == 'cabin'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('cabin_exterior')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_7')
            })

        } else if (this.currScene == 'cabin_exterior'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('cabin')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                if(this.keyCollected){this.advanceScene('cabin_interior')}
                else{this.deathText.text = "Cabin is locked!"}
            })

        } else if (this.currScene == 'field_7'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('lighthouse')
            })

        } else if (this.currScene == 'lighthouse'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('lighthouse_door')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL5, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('shore_1')
            })

        } else if (this.currScene == 'shore_1'){
            //arrow 1
            this.arrow1 = this.add.image(COL1, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('waterfall')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('shore_2')
            })

        } else if (this.currScene == 'shore_2'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('shore_1')
            })

        } else if (this.currScene == 'waterfall'){
            //arrow 1
            this.arrow1 = this.add.image(COL4, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_8')
            })

        } else if (this.currScene == 'field_8'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_6')
            })

        } else if (this.currScene == 'forest_6'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_8')
            })

        } else if (this.currScene == 'forest_8'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_7')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_6')
            })

        } else if (this.currScene == 'field_6'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_4')
            })

        } else if (this.currScene == 'forest_7'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_9')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL4, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_8')
            })

        } else if (this.currScene == 'forest_9'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('fire')
            })

        } else if (this.currScene == 'forest_10'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_11')
            })

        } else if (this.currScene == 'forest_11'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_12')
            })
            //arrow 2
            this.arrow1 = this.add.image(COL4, ROW5, 'arrow_down')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('field_5')
            })

        } else if (this.currScene == 'forest_12'){
            //arrow 1
            this.arrow1 = this.add.image(COL3, ROW4, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('outhouse')
            })

        } else if (this.currScene == 'forest_13'){
            //arrow 1
            this.arrow1 = this.add.image(COL2, ROW5, 'arrow_up')
            this.arrow1.setInteractive()
            this.arrow1.on('pointerdown', () => {
                this.advanceScene('forest_7')
            })

        } else if (this.currScene == 'forest_1'){
            //death
            if(this.knockedOut == false){
                this.knockedOut = true
                this.deathText.text = this.registry.get('character') + " was struck and knocked out by a falling tree. Did someone push it down on purpose? "
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL3, ROW5, 'arrow_down')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('forest_2')
                })
            }
        } else if (this.currScene == 'cliff'){
            //death
            if(this.pushed == false){
                this.pushed = true
                this.deathText.text = this.registry.get('character') + " felt someone push them off the cliff's edge before plummeting to his demise. Who was that?"
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL2, ROW5, 'arrow_down')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('field_3')
                })
            }
        } else if (this.currScene == 'dock'){
            //death
            if(this.drowned == false){
                this.drowned = true
                this.deathText.text = this.registry.get('character') + " was thrown off the side of the dock and held underwater until he ran out of oxygen. No one got a glimse of his murderer."
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL4, ROW5, 'arrow_down')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('lake')
                })
            }
        } else if (this.currScene == 'tent_3'){
            //death
            if(this.stabbed == false){
                this.stabbed = true
                this.deathText.text = this.registry.get('character') + " went to investigate the inside of the tent and was quickly trapped inside and stabbed to death by someone on the outside. Only the murderer's silhouette could be seen."
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL4, ROW5, 'arrow_down')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('tent_2')
                })
            }
        } else if (this.currScene == 'lighthouse_door'){
            //death
            if(this.crushed == false){
                this.crushed = true
                this.deathText.text = this.registry.get('character') + " approached the lighthouse door and, before he could react, a heavy object was dropped onto him from the top of the lighthouse. Who did this?"
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL1, ROW5, 'arrow_down')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('lighthouse')
                })
            }
        } else if (this.currScene == 'fire'){
            //death
            if(this.burned == false){
                this.burned = true
                this.deathText.text = this.registry.get('character') + " approached a campfire and was quickly shoved on top of it and douseded in gasoline. His friends couldn't reach him before his screams ceased. His murderer was gone."
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL4, ROW3, 'arrow_up')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('forest_10')
                })
            }
        } else if (this.currScene == 'outhouse'){
            //death
            if(this.suffocated == false){
                this.suffocated = true
                this.deathText.text = this.registry.get('character') + " just needed to tinkle and entered the outhouse. Before he could fully relieve himself, he was pulled down, buried, and suffocated under the earth. Someone was waiting for him."
                this.killActiveCharacter('sfx-tree')
            } else {
                //arrow 1
                this.arrow1 = this.add.image(COL5, ROW4, 'arrow_up')
                this.arrow1.setInteractive()
                this.arrow1.on('pointerdown', () => {
                    this.advanceScene('forest_13')
                })
            }
        }

        if(this.arrow1){
            this.sceneElements.add(this.arrow1)
        } 
        if(this.arrow2) {
            this.sceneElements.add(this.arrow2)
        }
        if(this.arrow3) {
            this.sceneElements.add(this.arrow3)
        }
    }

    killActiveCharacter(sfxKey){
        this.dead = true
        this.flashlight.setTexture('eyes').setScale(0.7)
        this.registry.set(this.registry.get('character'), 'dead')

        //conditions for which convo to return to
        if(this.registry.get('character') == 'wilbur'){
            this.registry.set('dialogConvo', 10)
        }

        if (this.sfxPlayed == false){
            this.sound.play(sfxKey)
            this.sfxPlayed = true
        }
    }
}