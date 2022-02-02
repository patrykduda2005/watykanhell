import Player from './player.js';
export default class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.image('bilean', 'assets/bilean.png');
		this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		
	}

	create() {
		this.add.image(400, 300, 'bilean');

		//Stworzenie gracza na podstawie klasy z player.js
		this.player = new Player(this, 400, 300);

	}

	update() {
		//Potrzebne aby funkcja update w klasie z player.js dzialala
		this.player.update();
	}
}