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
		this.maxVel = 300;
		this.inaccuracy = 25;
		this.damage = 5;
		this.breaking = this.scene.time.addEvent();
		this.jumpDelay = 2000;



		//obrazenia
		this.scene.physics.overlap(this, this.scene.player, this.damage, null, this);

		//uruchomienie update
		//this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);

		this.updateInterval = scene.time.addEvent({
			delay: 1000/scene.physics.world.fps,
			loop: true,
			callback: this.update,
			callbackScope: this
		});

		this.jumpInterval = scene.time.addEvent({
			delay: this.jumpDelay,
			callback: this.jump,
			callbackScope: this
		});

		
	}

	update() {
	}

	jump() {
		this.breaking.destroy();
		

		this.scene.physics.moveTo(this, this.targetX + Phaser.Math.RND.between(-this.inaccuracy, this.inaccuracy), this.targetY + Phaser.Math.RND.between(-this.inaccuracy, this.inaccuracy), this.maxVel);
		this.targetX = this.scene.player.x;
		this.targetY = this.scene.player.y;

		this.jumpInterval = this.scene.time.addEvent({
			delay: this.jumpDelay,
			callback: this.jump,
			callbackScope: this
		});

		this.break(1);

	}

	break(velocityReduction) {
		
		//let velocityReduction = this.maxVel / this.breakingTime;
		if (this.body.velocity.x > 0) this.body.velocity.x -= velocityReduction;
		if (this.body.velocity.x < 0) this.body.velocity.x += velocityReduction;
		if (this.body.velocity.y > 0) this.body.velocity.y -= velocityReduction;
		if (this.body.velocity.y < 0) this.body.velocity.y += velocityReduction;

		if (this.body.velocity.x > -(velocityReduction) && this.body.velocity.x < velocityReduction) {
			this.body.velocity.x = 0;
			
		}
		if (this.body.velocity.y > -(velocityReduction) && this.body.velocity.y < velocityReduction) {
			this.body.velocity.y = 0;
			
		}

		if (this.body.velocity.x == 0 && this.body.velocity.y == 0) return;

		this.breaking = this.scene.time.addEvent({
			delay: 1000/this.scene.physics.world.fps,
			callback: this.break,
			callbackScope: this,
			args: [velocityReduction * 1.07]
		});

	}

	damage(kao, victim) {
		victim.health -= kao.damage;
	}

	death() {
		this.breaking.destroy();
		this.jumpInterval.destroy();
		this.updateInterval.destroy();
		this.body.destroy();
		this.destroy();
	}

	/*to-do list:
		damage function

	*/
}