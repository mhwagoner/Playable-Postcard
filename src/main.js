// Name: Michael Wagoner

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 900,
    height: 600,
    pixelArt: true,
    speed: 40,
    zoom: 1,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Campfire, Text, Walk ]
}

const game = new Phaser.Game(config)

let { width, height } = game.config
let cursors = null