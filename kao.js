export default class Kao extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, key = 'dude') {
		super(scene, x, y, key);

		//dodanie playera do sceny
		scene.physics.add.existing(this);
		scene.add.existing(this);

		//Żeby nie wypadł poza świat
		scene.physics.world.setBounds(0,0,820,580);
		this.setCollideWorldBounds(true);

		//staty
		this.health = 20;
		this.targetX = this.scene.player.x;
		this.targetY = this.scene.player.y;
		this.scene = scene;



		this.jump();

		//uruchomienie update (UWAGA! w taki sposob this znaczy window, a nie Kao)
		//this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);

		this.updateInterval = scene.time.addEvent({
			delay: 1000/scene.physics.world.fps,
			loop: true,
			callback: this.update,
			callbackScope: this
		});

		this.jumpInterval = scene.time.addEvent({
			delay: 3000,
			loop: true,
			callback: this.jump,
			callbackScope: this
		});
	}

	update() {
		this.stop();
	}

	jump() {
		this.scene.physics.moveTo(this, this.targetX, this.targetY, 300, 1000);
	}

	stop() {
		if (Phaser.Math.Distance.Between(this.x, this.y, this.targetX, this.targetY) < 4 && this.body.velocity != 0) {
			this.body.reset(this.targetX, this.targetY);
			this.targetX = this.scene.player.x;
			this.targetY = this.scene.player.y;
		}
	}
}