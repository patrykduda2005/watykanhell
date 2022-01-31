class Room1 extends Phaser.Scene {
	constructor() {
		super({key:"Room1"});
	}

	preload() {
		this.load.image('bilean', 'assets/bilean.png');
	}

	create() {
		this.add.image(400, 300, 'bilean');
	}

	update() {
		
	}
}