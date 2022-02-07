export default class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, key = 'dude', dirX, dirY, speed = 100, dis=400, host, damage = 1) {
		super(scene, x, y, key);

		//dodanie bulleta do sceny
		scene.physics.add.existing(this);
		scene.add.existing(this);

		//Żeby nie wypadł poza świat
		scene.physics.world.setBounds(0,0,800,600);
		this.setCollideWorldBounds(true);

		
		

		//Informacje potrzebne do strzału bulletu
		this.fireInfo = {
			originX: x,
			originY: y,
			destinationX: dirX,
			destinationY: dirY,
			speed: speed,
			distance: dis
		}
		
		//staty bulleta
		this.bulletDamage = damage;
		this.scene = scene;
		this.host = host;
		
		//detect gdy dotknie
		this.scene.physics.overlap(this, this.scene.isBulletable, this.damage, null, this);
		

		//Wystrzeliwuje bullet
		this.fire();

		
		

		//uruchomienie update (UWAGA! w taki sposob this znaczy window, a nie bullet)
		this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);
	}

	update(bullet) {
		//Usuwa bullet gdy ten nie trafi
		bullet.missDestroyer();

	}

	fire() {
		this.scene.physics.moveTo(this, this.fireInfo.destinationX, this.fireInfo.destinationY, this.fireInfo.speed);
	}

	missDestroyer() {
		if (this.body.embedded || Phaser.Math.Distance.Between(this.fireInfo.originX, this.fireInfo.originY, this.x, this.y) > this.fireInfo.distance) {
			clearInterval(this.updateInterval);
			this.destroy();
		}
	}

	damage(bullet, victim) {
		if (victim == bullet.host) return;
		victim.health -= 1;
		clearInterval(bullet.updateInterval);
		bullet.destroy();
	
	}
	

}