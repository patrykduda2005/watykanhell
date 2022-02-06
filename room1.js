import Player from './player.js';
export default class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('tiles', 'tiles/Textures/Objects/Floor.png');
		this.load.tilemapTiledJSON('mapa', 'tiles/MapaTestowa.json');
	}

	create() {


		const map = this.make.tilemap({key: 'mapa'})

		//zmienna tworząca podlogę
		const podloga = map.addTilesetImage('Floor', 'tiles')

		//zmienna tworząca ściany
		const sciana = map.addTilesetImage('Wall', 'tiles')

		//tworzenie podłogi
		map.createLayer('podloga', podloga)

		//tworzenie ścian
		map.createLayer('sciana', sciana)



		/*wszystko poniżej to próba ustawienia kolizji - nieskuteczna
		
		walls.setCollisionByProperty({collides: true})

		const kolizje = this.add.graphics().setAlpha(0.7)
		walls.renderDebug(debugGraphics, {
			titleColor: null,
			collidingTileColor: new Phase.Display.Color(243,234,48),
			faceColor: new Phaser.Display.Color(40,39,37,255),
		})*/



		//Stworzenie gracza na podstawie klasy z player.js
		this.player = new Player(this, 250, 150);
	}

	update() {
		
	}
}