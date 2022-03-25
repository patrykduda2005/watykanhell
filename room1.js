import Player from './player.js';
import Kao from './Przeciwnicy/kao.js';
//import Mag from  './Przeciwnicy/mag.js';

export default class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('mag', 'tiles/Tekstury/frames/mag.png');
		this.load.image('tiles', 'tiles/Tekstury/obrazek.png');
		this.load.tilemapTiledJSON('mapa', 'tiles/mapa01.json');
	}

	create() {


//Stworzenie gracza na podstawie klasy z player.js
	this.player = new Player(this, 200, 150).setDepth(-5);
	this.kao = new Kao(this, 10, 10);
	const mag = this.physics.add.sprite(200, 250, 'mag', 'tiles/Tekstury/frames/mag.png').setDepth(-5);


	const mapa = this.make.tilemap({key: 'mapa', tileWidth: 16, tileHeight: 16});
	const tileset = mapa.addTilesetImage('obrazek', 'tiles');

	
	
			//tworzenie warsty podlogi		
		mapa.createLayer('podloga', tileset, 0, 0).setDepth(-10);
		
		 //tworzenie filarów
		mapa.createLayer('filary', tileset, 0,0).setDepth(-4);

			//tworzenie warstwy scian
		const warstwaScian = mapa.createLayer('sciany', tileset, 0, 0).setDepth(0);
		

		 //kolizje 
		warstwaScian.setCollisionByProperty({ collides: true })
		this.physics.add.collider(this.player, warstwaScian)
		this.physics.add.collider(this.player, mag)
		this.physics.add.collider(this.player, this.kao)
		this.physics.add.collider(mag, warstwaScian)

		

			//kolor kolizji 'w razie potrzeby odkomentarzować'
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
