import Player from './player.js';
//import Mag from  './mag.js';
export default class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('mag', 'tiles/Tekstury/frames/przeciwnik.png',);
		this.load.image('tiles', 'tiles/Tekstury/obrazek.png');
		this.load.tilemapTiledJSON('mapa', 'tiles/mapa01.json');
	}

	create() {


//Stworzenie gracza na podstawie klasy z player.js
	this.player = new Player(this, 200, 150);


	const mag = this.physics.add.sprite(200, 250, 'mag', 'tiles/Tekstury/frames/przeciwnik.png')

	const mapa = this.make.tilemap({key: 'mapa', tileWidth: 16, tileHeight: 16});
	const tileset = mapa.addTilesetImage('obrazek', 'tiles');

			//tworzenie warsty podlogi		
		mapa.createLayer('podloga', tileset, 0, 0).setDepth(-1);

			//tworzenie warsty scian
		const warstwaScian = mapa.createLayer('sciany', tileset, 0, 0).setDepth(0);
		

		 //kolizje 
		warstwaScian.setCollisionByProperty({ collides: true })
		this.physics.add.collider(this.player, warstwaScian)
		this.physics.add.collider(this.player, mag)



			//kolor kolizji 'w razie potrzeby zakomentarzować
	/*	const debugGraphics = this.add.graphics().setAlpha(0.7)
		warstwaScian.renderDebug(debugGraphics,{
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 234, 48, 225),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255),
		})*/
	}

	update() {
		
	}
}