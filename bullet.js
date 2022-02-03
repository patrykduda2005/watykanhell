export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key = 'dude', dirX, dirY, speed = 100, dis=400) {
		super(scene, x, y, key);

		//dodanie playera do sceny
		scene.physics.add.existing(this);
		scene.add.existing(this);

		//Żeby nie wypadł poza świat
		scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);
		
		this.damage = 1;
		this.dis = dis;
		this.oriX = x;
		this.oriY = y;
		scene.physics.moveTo(this, dirX, dirY, speed);

		this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);
	}

	update(bullet) {
		bullet.distanceLimit();
	}

	distanceLimit() {
		if (this.body.embedded || Phaser.Math.Distance.Between(this.oriX, this.oriY, this.x, this.y) > this.dis) {
			clearInterval(this.updateInterval);
			this.destroy();
		}
	}

}