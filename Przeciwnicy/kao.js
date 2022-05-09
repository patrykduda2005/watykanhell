export default class Kao extends Phaser.Physics.Arcade.Sprite {
	constructor (config) {

		if (config.key == null) config.key = 'kao';
		if (config.target == null) config.target = config.scene.player;

		super(config.scene, config.x, config.y, config.key);

		//dodanie playera do sceny
		config.scene.physics.add.existing(this);
		config.scene.add.existing(this);

		//Żeby nie wypadł poza świat
		config.scene.physics.world.setBounds(0,0,820,580);
		this.setCollideWorldBounds(true);

		this.scene = config.scene;

		this.target = config.target;

		this.breaking = this.scene.time.addEvent();

		this.lastPosition = [this.x, this.y];
		this.isBreaking = false;
		this.distanceToTravel = 0;
		this.distanceTravelledSinceJump = 0;



		//staty
		this.health = 20;
		
		

		this.updateInterval = this.scene.time.addEvent({
			delay: 1000/this.scene.physics.world.fps,
			loop: true,
			callback: this.update,
			callbackScope: this
		});

		this.jumpInterval = this.scene.time.addEvent({
			delay: 2000,
			callback: this.jump,
			callbackScope: this
		});

		
	}

	update() {
		 
		 this.distanceTravelledSinceJump += this.distanceRecentlyTravelled();
		 if (this.distanceTravelledSinceJump >= this.distanceToTravel && !this.isBreaking) this.break(20);
		
	}

	distanceRecentlyTravelled() {
		let distance = Phaser.Math.Distance.Between(this.x, this.y, this.lastPosition[0], this.lastPosition[1]);
		this.lastPosition = [this.x, this.y];
		return distance;
	}


	jump() {
		this.breaking.destroy();


		let jumpInaccuracy = 5;
		let velocity = 300;
		let targetCoords = [this.target.x + Phaser.Math.RND.between(-jumpInaccuracy, jumpInaccuracy), this.target.y + Phaser.Math.RND.between(-jumpInaccuracy, jumpInaccuracy)];

		let distanceToBreakBeforePoint = 25
		let distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, targetCoords[0], targetCoords[1]);
		this.distanceToTravel = distanceToTarget - distanceToBreakBeforePoint;

		this.scene.physics.moveTo(this, targetCoords[0], targetCoords[1], velocity);


		this.jumpInterval = this.scene.time.addEvent({
			delay: 2000,
			callback: this.jump,
			callbackScope: this
		});

	}

	break(velocityReduction = 2) {
		this.isBreaking = true;

		//Konczy zatrzymywanie
		if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
			this.isBreaking = false;
			this.distanceTravelledSinceJump = 0;
			return;
		}

		//Zamienia liczbe na odpowiedni "wektor"
		if(!Array.isArray(velocityReduction)) {
			if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
				velocityReduction = [Math.abs(velocityReduction), Math.abs(velocityReduction * (this.body.velocity.y/this.body.velocity.x))];
			} else {
				velocityReduction = [Math.abs(velocityReduction * (this.body.velocity.x/this.body.velocity.y)), Math.abs(velocityReduction)];
			}
		}

		//Zeruje aby uniknac niedokladnosci
		if (this.body.velocity.x < velocityReduction[0] && this.body.velocity.x > -velocityReduction[0]) this.body.velocity.x = 0;
		if (this.body.velocity.y < velocityReduction[1] && this.body.velocity.y > -velocityReduction[1]) this.body.velocity.y = 0;

		//Odejmuje
		if (this.body.velocity.x > 0) this.body.velocity.x -= velocityReduction[0];
		if (this.body.velocity.x < 0) this.body.velocity.x += velocityReduction[0];
		if (this.body.velocity.y > 0) this.body.velocity.y -= velocityReduction[1];
		if (this.body.velocity.y < 0) this.body.velocity.y += velocityReduction[1];


		//Wykonuje sie ponownie dopoki nie skonczy zatrzymywac
		this.breaking = this.scene.time.addEvent({
			delay: 1000/this.scene.physics.world.fps,
			callback: this.break,
			callbackScope: this,
			args: [velocityReduction]
		});
	}

	/*to-do list:
		damage function
		death function
	*/

}