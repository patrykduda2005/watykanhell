export default class Mag extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key = 'mag'){
       super(scene, x, y, key);

        scene.physics.add.existing(this);
        scene.add.existing(this);


        this.health = 10;
        this.targetX = this.scene.player.x;
        this.targetY = this.scene.player.y;
        this.scene = scene;

      



        this.updateInterval = setInterval(this.update, 1000/scene.physics.world.fps, this);
}

update(){
    
}


}

