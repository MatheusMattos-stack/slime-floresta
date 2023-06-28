import Phaser from 'phaser';
import Bullet from './bullet';

class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      frameQuantity: 10,
      active: false,
      visible: false,
      collide: true,
      key: 'bullet',
    });
  }

  fireBullet(x, y, facing) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y, facing);
    }
  }
}


export default BulletGroup;