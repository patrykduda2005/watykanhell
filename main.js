//Potrzebne aby wiedziało czym jest scena Room1
import Room1 from './room1.js';
var config = {
    type: Phaser.AUTO,
    pixelArt: true,
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