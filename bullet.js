export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key = 'dude', direction = 'up', speed = 100) {
		super(scene, x, y, key);

		//dodanie playera do sceny
		scene.physics.add.existing(this);
		scene.add.existing(this);

		//Żeby nie wypadł poza świat
		scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);
		
		this.damage = 1;
		

		this.fire(direction, speed);
	}

	update() {

	}

	fire(direction, speed = 100) {
		switch (direction) {
			case 'up':
				this.setVelocityY(-speed);
				break;
			case 'down':
				this.setVelocityY(speed);
				break;
			case 'left':
				this.setVelocityX(-speed);
				break;
			case 'right':
				this.setVelocityX(speed);
		}
	}
}