class Walk extends Phaser.Scene {
    constructor() {
        super("walkScene")
    }

    create() {
        this.cardBack = this.add.image(0, 0, 'card_img').setOrigin(0)
        this.background = this.add.image(25, 25, 'rutherford_stairs').setOrigin(0).setScale(0.2)
        this.flashlight = this.physics.add.sprite(0, 0, 'flashlight_img').setOrigin(0.5)
    }

    update() {

        //move flashlight sprite IF certain distance away from pointer
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) <= 5 || Math.abs(this.flashlight.y - this.input.activePointer.y) <= 5){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 0)
        }
        if(Math.abs(this.flashlight.x - this.input.activePointer.x) > 5 || Math.abs(this.flashlight.y - this.input.activePointer.y) > 5){
            this.physics.moveToObject(this.flashlight, this.input.activePointer, 300)
        }
    }
}