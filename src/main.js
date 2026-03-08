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
            debug: true
        }
    },
    scene: [ Load, Campfire, Text ]
}

const game = new Phaser.Game(config)

let { width, height } = game.config
let cursors = null