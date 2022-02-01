export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key = 'dude') {
		super(scene, x, y, key);

		//dodanie playera do sceny
		scene.physics.add.existing(this);
		scene.add.existing(this);

		//Żeby nie wypadł poza świat
		scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);
		
		//Wprowadzenie przycisków
		this.cursors = scene.input.keyboard.createCursorKeys();
	}

	//Odpala się w kółko
	update() {
		this.run();
	}

	run() {
		let vel = 100;
		// if(this.cursors.right.isDown && this.cursors.up.isDown) {
		// 	this.setVelocity(vel,-vel);
		// } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
		// 	this.setVelocity(vel,vel);
		// } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
		// 	this.setVelocity(-vel, -vel);
		// } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
		// 	this.setVelocity(-vel, vel);
		//}


		//Podstawowy movement (na razie średnio działa)
		if (this.cursors.right.isDown) {
			this.setVelocity(0, 0);
			this.setVelocityX(vel);
		} else if (this.cursors.left.isDown) {
			this.setVelocity(0, 0);
			this.setVelocityX(-vel);
		} 
		if (this.cursors.down.isDown) {
			this.setVelocity(0, 0);
			this.setVelocityY(vel);
		} else if (this.cursors.up.isDown) {
			this.setVelocity(0, 0);
			this.setVelocityY(-vel);
		}
	}

}