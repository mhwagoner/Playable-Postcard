class Text extends Phaser.Scene {
    constructor() {
        super("textScene")
    }

    init() {
        // dialog constants
        this.MAIN_FONT = 'lr_font'	    // dialog font key 

        this.TEXT_X = 10			    // text w/in dialog box x-position
        this.TEXT_Y = 10			    // text w/in dialog box y-position
        this.TEXT_SIZE = 16		        // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 230	    // max width of text within box

        this.NEXT_TEXT = '[SPACE]'	    // text to display for next prompt
        this.NEXT_X = 340			    // next text prompt x-position
        this.NEXT_Y = 245			    // next text prompt y-position

        this.OPTION_X = 270             // x-position of options
        this.OPTION1_Y = 115            // y-pos of option 1
        this.OPTION2_Y = 150            // y-pos of option 2
        this.OPTION3_Y = 185            // y-pos of option 3
        this.OPTION4_Y = 220            // y-pos of option 4

        this.LETTER_TIMER = 10		    // # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0			// current "conversation"
        this.dialogLine = 0			    // current line of conversation
        this.dialogSpeaker = null		// current speaker
        this.dialogLastSpeaker = null	// last speaker
        this.dialogTyping = false		// flag to lock player input while text is "typing"
        this.dialogText = null			// the actual dialog text
        this.nextText = null			// player prompt text to continue typing
        this.option1Text = null
        this.option2Text = null
        this.option3Text = null
        this.option4Text = null

        // character variables
        this.tweenDuration = 500        // character in/out tween duration

        this.PROFILE_X = 373         // x,y coordinates used to place characters
        this.PROFILE_Y = 22
    }

    create() {
        //load background image
        this.background = this.add.image(0, 0, 'card_text').setOrigin(0,0)
        
        // setup keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Playable Postcard:</strong> Mouse: interact'
        
        //parse dialog
        this.dialog = this.cache.json.get('dialog')

        //ready character profiles
        //this.Socky = this.add.sprite(0,0, 'socky')
        this.bottom = this.add.sprite(this.PROFILE_X, this.PROFILE_Y, 'bottom').setOrigin(0,0)
        this.worstBird = this.add.sprite(this.PROFILE_X, this.PROFILE_Y, 'worstBird').setOrigin(0,0)

        //initialize dialog text objects
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.MAIN_FONT, '', this.TEXT_SIZE)
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.MAIN_FONT, '', this.TEXT_SIZE)
        this.option1Text = this.add.bitmapText(this.OPTION_X, this.OPTION1_Y, this.MAIN_FONT, '', this.TEXT_SIZE).setOrigin(0,1)
        this.option2Text = this.add.bitmapText(this.OPTION_X, this.OPTION2_Y, this.MAIN_FONT, '', this.TEXT_SIZE).setOrigin(0,1)
        this.option3Text = this.add.bitmapText(this.OPTION_X, this.OPTION3_Y, this.MAIN_FONT, '', this.TEXT_SIZE).setOrigin(0,1)
        this.option4Text = this.add.bitmapText(this.OPTION_X, this.OPTION4_Y, this.MAIN_FONT, '', this.TEXT_SIZE).setOrigin(0,1)

        //make options interactive
        const optionHitbox = new Phaser.Geom.Rectangle(0, 0, 150, 20);

        this.option1Text.setInteractive(optionHitbox, Phaser.Geom.Rectangle.Contains)
        this.option1Text.on('pointerdown', () => {
            console.log('clicked!')
        })
        this.input.enableDebug(this.option1Text)

        this.option2Text.setInteractive(optionHitbox, Phaser.Geom.Rectangle.Contains)
        this.option2Text.on('pointerdown', () => {
            console.log('clicked!')
        })
        this.input.enableDebug(this.option2Text)

        this.option3Text.setInteractive(optionHitbox, Phaser.Geom.Rectangle.Contains)
        this.option3Text.on('pointerdown', () => {
            console.log('clicked!')
        })
        this.input.enableDebug(this.option3Text)

        this.option4Text.setInteractive(optionHitbox, Phaser.Geom.Rectangle.Contains)
        this.option4Text.on('pointerdown', () => {
            console.log('clicked!')
        })
        this.input.enableDebug(this.option4Text)

        //start first conversation
        this.typeText()
    }

    tempfunction(){
        console.log("hello")
    }

    update() {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            this.typeText() // trigger dialog
        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true

        // clear text
        this.dialogText.text = ''
        this.nextText.text = ''
        this.option1Text.text = ''
        this.option2Text.text = ''
        this.option3Text.text = ''
        this.option4Text.text = ''

        /* JSON dialog structure: 
            - each array within the main JSON array is a "conversation"
            - each object within a "conversation" is a "line"
            - each "line" can have 3 properties: 
                1. a speaker (required)
                2. the dialog text (required)
                3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this conversation, otherwise jump to next conversation
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0
            // I increment the conversation count here...
            // ..but you could create logic to exit if each conversation was self-contained
            this.dialogConvo++
        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo >= this.dialog.length) {
            // here I'm exiting the final conversation to return to the title...
            // ...but you could add alternate logic if needed
            console.log('End of Conversations')
            
            // tween out prior speaker's image and return to title screen
            if(this.dialogLastSpeaker) {
                /*this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear',
                    onComplete: () => {
                        this.dialogbox.visible = false
                        this.scene.start('titleScene')
                    }
                })*/
            }
        } else {
            // ...if we still have conversations left, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker']
            
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                //move prior speaker's image to lower depth
                if(this.dialogLastSpeaker) {
                    this[this.dialogLastSpeaker].setDepth(1)
                }
                // raise new speaker's image to higher depth
                this[this.dialogSpeaker].setDepth(10)
            }

            // build dialog (concatenate speaker + colon + line of text)
            this.combinedDialog = 
                this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() 
                + ': ' 
                + this.dialog[this.dialogConvo][this.dialogLine]['dialog']

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.combinedDialog.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.combinedDialog[currentChar]
                    // advance character position
                    currentChar++
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.MAIN_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(0.5)
                        this.dialogTyping = false   // un-lock input

                        //handle options
                        if(this.dialog[this.dialogConvo][this.dialogLine-1]['option1']){
                            this.option1Text.text = this.dialog[this.dialogConvo][this.dialogLine-1]['option1']
                        }
                        if(this.dialog[this.dialogConvo][this.dialogLine-1]['option2']){
                            this.option2Text.text = this.dialog[this.dialogConvo][this.dialogLine-1]['option2']
                        }
                        if(this.dialog[this.dialogConvo][this.dialogLine-1]['option3']){
                            this.option3Text.text = this.dialog[this.dialogConvo][this.dialogLine-1]['option3']
                        }
                        if(this.dialog[this.dialogConvo][this.dialogLine-1]['option4']){
                            this.option4Text.text = this.dialog[this.dialogConvo][this.dialogLine-1]['option4']
                        }

                        this.textTimer.destroy()    // destroy timer
                    }
                },
                callbackScope: this // keep Scene context
            })
            
            // final cleanup before next iteration
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH  // set bounds on dialog
            this.dialogLine++                               // increment dialog line
            this.dialogLastSpeaker = this.dialogSpeaker     // set past speaker
        }
    }
}