import Room1 from './room1.js';
var config = {
    type: Phaser.AUTO,
    scale: {
    	mode: Phaser.Scale.FIT,
    	width: 800,
    	height: 600,
    	autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:0},
            debug: true
        }
    },
    scene: [ Room1 ]
};

var game = new Phaser.Game(config);