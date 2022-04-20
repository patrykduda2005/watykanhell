export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(/*scene, x, y, key = 'dude', dirX, dirY, speed = 100, dis=400, host, damage = 1*/config) {
		

		super(config.scene, config.x, config.y, config.key);

		//dodanie bulleta do sceny
		config.scene.physics.add.existing(this);
		config.scene.add.existing(this);

		//Żeby nie wypadł poza świat
		config.scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);

		
		

		//Informacje potrzebne do strzału bulletu
		this.fireInfo = {
			originX: config.x,
			originY: config.y,
			destinationX: config.dirX,
			destinationY: config.dirY,
			speed: config.speed,
			distance: config.dis
		}
		
		//staty bulleta
		this.bulletDamage = config.damage;
		this.scene = config.scene;
		this.host = config.host;
		
		
		
		//detect gdy dotknie
		//this.scene.physics.overlap(this, this.scene.player, this.damage, null, this);

		//Wystrzeliwuje bullet (aktualnie jest blad poniewaz bullet moze nie istniec w tym momencie a probuje dac mu velocity)
		this.fire();

		

		//uruchomienie update
		//this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);

		this.updateInterval = config.scene.time.addEvent({
			delay: 1000/config.scene.physics.world.fps,
			loop: true,
			callback: this.update,
			callbackScope: this
		});
	}

	update() {
		//Usuwa bullet gdy ten nie trafi
		this.missDestroyer();

	}

	fire() {
		this.scene.physics.moveTo(this, this.fireInfo.destinationX, this.fireInfo.destinationY, this.fireInfo.speed);
	}

	missDestroyer() {
		if (this.body.embedded || Phaser.Math.Distance.Between(this.fireInfo.originX, this.fireInfo.originY, this.x, this.y) > this.fireInfo.distance) {
			//zniszczenie bulleta
			this.updateInterval.destroy();
			this.destroy();
		}
	}

	damage(bullet, victim) {
		//Zeby nie trafic obiekt ktory to wysyla
		if (victim == bullet.host) return;

		//Redukcja zycia
		victim.health -= bullet.bulletDamage;

		//zniszczenie bulleta
		bullet.updateInterval.destroy();
		bullet.destroy();
	
	}
	

}