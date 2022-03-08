import Player from './player.js';
export default class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('tiles', 'tiles/Tekstury/obrazek.png');
		this.load.tilemapTiledJSON('mapa', 'tiles/mapa01.json');
	}

	create() {


//Stworzenie gracza na podstawie klasy z player.js
this.player = new Player(this, 200, 150);
		

	const mapa = this.make.tilemap({key: 'mapa', tileWidth: 16, tileHeight: 16});
	const tileset = mapa.addTilesetImage('obrazek', 'tiles');
			//tworzenie warsty podlogi		
		mapa.createLayer('podloga', tileset, 0, 0).setDepth(-1);


			//tworzenie warsty scian
		const warstwaScian = mapa.createLayer('sciany', tileset, 0, 0);


		//nue działą   >:|
		warstwaScian.setCollisionBetween(33,35);
	}

	update() {
		
	}
}