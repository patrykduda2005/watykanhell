export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key = 'dude') {
		super(scene, x, y, key);

		scene.physics.add.existing(this);
		scene.add.existing(this);

		scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);
		
		this.cursors = scene.input.keyboard.createCursorKeys();
	}
	update() {
		this.run();
	}

	run() {
		let vel = 100;
		if(this.cursors.right.isDown && this.cursors.up.isDown) {
			this.setVelocity(vel,-vel);
		} else if (this.cursors.right.isDown && this.cursors.down.isDown) {
			this.setVelocity(vel,vel);
		} else if (this.cursors.left.isDown && this.cursors.up.isDown) {
			this.setVelocity(-vel, -vel);
		} else if (this.cursors.left.isDown && this.cursors.down.isDown) {
			this.setVelocity(-vel, vel);
		} else if (this.cursors.right.isDown) {
			this.setVelocityX(vel);
		} else if (this.cursors.left.isDown) {
			this.setVelocityX(-vel);
		} else if (this.cursors.down.isDown) {
			this.setVelocityY(vel);
		} else if (this.cursors.up.isDown) {
			this.setVelocityY(-vel);
		} else {
			this.setVelocity(0, 0);
		}
	}


}