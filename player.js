import Bullet from './bullet.js';
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
		this.WSAD = scene.input.keyboard.addKeys({ 
			'W': Phaser.Input.Keyboard.KeyCodes.W,
			'S': Phaser.Input.Keyboard.KeyCodes.S,
			'A': Phaser.Input.Keyboard.KeyCodes.A,
			'D': Phaser.Input.Keyboard.KeyCodes.D
		});
		this.cursors = scene.input.keyboard.createCursorKeys();

		//staty gracza
		this.playerHealth = 20;
		this.attackCD = 1000;
		this.ableToAttack = true;
		this.attackDamage = 1;
		this.scene = scene;

		//uruchomienie update (UWAGA! w taki sposob this znaczy window, a nie player)
		setInterval(this.update, 1000/60, this);
		
	}

	//Odpala się w kółko
	update(player) {

		player.run();
		if (player.ableToAttack == true) {
			player.fire();
		}
	}

	run() {
		const maxVel = 200; //maksymalna prędkość
		const breaking = 10; //w ile klatek się zatrzymuje
		const accel = 5;	//w ile klatek się rozpędza



		//Rozpędzanie
		if (this.WSAD.D.isDown && this.body.velocity.x < maxVel) {
			this.body.velocity.x += maxVel/accel;
			if (this.body.velocity.x > maxVel) this.body.velocity.x = maxVel; //Korekcja do maxVel

		} else if (this.WSAD.A.isDown && this.body.velocity.x > -maxVel) {
			this.body.velocity.x -= maxVel/accel;
			if (this.body.velocity.x < maxVel) this.body.velocity.x = -maxVel; //Korekcja do maxVel
		
		}
		if (this.WSAD.S.isDown && this.body.velocity.y < maxVel) {
			this.body.velocity.y += maxVel/accel;
			if (this.body.velocity.y > maxVel) this.body.velocity.y = maxVel; //Korekcja do maxVel

		} else if (this.WSAD.W.isDown && this.body.velocity.y > -maxVel) {
			this.body.velocity.y -= maxVel/accel;
			if (this.body.velocity.y < maxVel) this.body.velocity.y = -maxVel; //Korekcja do maxVel

		}

		//Naprawia to, że na ukos ~1,414 szybciej się chodzi
		if ((Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y)) == (maxVel*2)) {
			this.body.velocity.x /= Math.sqrt(2);
			this.body.velocity.y /= Math.sqrt(2);
		}

		//Zatrzymywanie
		if (this.body.velocity.x > 0 && !this.WSAD.D.isDown) this.body.velocity.x -= maxVel/breaking;
		if (this.body.velocity.x < 0 && !this.WSAD.A.isDown) this.body.velocity.x += maxVel/breaking;
		if (this.body.velocity.y > 0 && !this.WSAD.S.isDown) this.body.velocity.y -= maxVel/breaking;
		if (this.body.velocity.y < 0 && !this.WSAD.W.isDown) this.body.velocity.y += maxVel/breaking;

		//Korektowanie
		if (this.body.velocity.x > -(maxVel/breaking) && this.body.velocity.x < maxVel/breaking) this.body.velocity.x = 0;
		if (this.body.velocity.y > -(maxVel/breaking) && this.body.velocity.y < maxVel/breaking) this.body.velocity.y = 0;

	}

	fire() {
		if (this.cursors.up.isDown) {
			this.ableToAttack = false;
			new Bullet(this.scene, this.x, this.y, 'dude', 'up', 300);
			setTimeout(function(player) {
				player.ableToAttack = true;
			}, this.attackCD, this);
		} else if (this.cursors.down.isDown) {
			this.ableToAttack = false;
			new Bullet(this.scene, this.x, this.y, 'dude', 'down', 300);
			setTimeout(function(player) {
				player.ableToAttack = true;
			}, this.attackCD, this);
		} else if (this.cursors.left.isDown) {
			this.ableToAttack = false;
			new Bullet(this.scene, this.x, this.y, 'dude', 'left', 300);
			setTimeout(function(player) {
				player.ableToAttack = true;
			}, this.attackCD, this);
		} else if (this.cursors.right.isDown) {
			this.ableToAttack = false;
			new Bullet(this.scene, this.x, this.y, 'dude', 'right', 300);
			setTimeout(function(player) {
				player.ableToAttack = true;
			}, this.attackCD, this);
		}
	}

}