export default class Kao extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, key = 'kao') {
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
		this.jumpDelay = 2000; //w milisekundach
		this.distanceX = 1;
		this.distanceY = 1;

		this.body.bounce = 0.1;	
		console.log(this);	

		//obrazenia
		//this.scene.physics.overlap(this, this.scene.player, this.damage, null, this);

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
		//zatrzymuje zatrzymywanie sie
		this.breaking.destroy();

		//console.log('skok');
		this.distanceX = Phaser.Math.Difference(this.x, this.scene.player.x);
		this.distanceY = Phaser.Math.Difference(this.y, this.scene.player.y);
		
		//rzuca kangura do zapisanego x,y ale z lekkim przesunieciem
		this.scene.physics.moveTo(this, this.targetX + Phaser.Math.RND.between(-this.inaccuracy, this.inaccuracy), this.targetY + Phaser.Math.RND.between(-this.inaccuracy, this.inaccuracy), this.maxVel);

		//zapisuje koordynaty gracza
		this.targetX = this.scene.player.x;
		this.targetY = this.scene.player.y;
		this.maxVel = Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY, 2));


		//uruchamia siebie ponownie za this.jumpDelay milisekund
		this.jumpInterval = this.scene.time.addEvent({
			delay: this.jumpDelay,
			callback: this.jump,
			callbackScope: this
		});

		//uruchamia zatrzymywanie sie
		this.break((500/this.distanceX), (500/this.distanceY)); //Im wieksza wartosc tym wczesniej zatrzymywanie

	}

	break(velocityReductionX, velocityReductionY) {
		//zeruje zamiast ostatniego odejmowania
		if (this.body.velocity.x > -(velocityReductionX) && this.body.velocity.x < velocityReductionX) {
			this.body.velocity.x = 0;	
		}
		if (this.body.velocity.y > -(velocityReductionY) && this.body.velocity.y < velocityReductionY) {
			this.body.velocity.y = 0;
		}
		
		//odejmuje od velocity velocityReduction
		if (this.body.velocity.x > 0) this.body.velocity.x -= velocityReductionX;
		if (this.body.velocity.x < 0) this.body.velocity.x += velocityReductionX;
		if (this.body.velocity.y > 0) this.body.velocity.y -= velocityReductionY;
		if (this.body.velocity.y < 0) this.body.velocity.y += velocityReductionY;


		//jesli kangur sie zatrzymal to przerwac zatrzymywanie
		if (this.body.velocity.x == 0 && this.body.velocity.y == 0) return;


		//uruchamia samego siebie z innym odejmnikiem
		this.breaking = this.scene.time.addEvent({
			delay: 1000/this.scene.physics.world.fps,
			callback: this.break,
			callbackScope: this,
			args: [velocityReductionX * (1+(10/this.distanceX)), velocityReductionY * (1+(10/this.distanceY))]
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