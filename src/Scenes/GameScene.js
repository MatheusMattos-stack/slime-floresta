/* eslint class-methods-use-this: ["error",
{ "exceptMethods": ["scoreUp", "shootBullet", "playerProperties"] }] */
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.backgroundLayers = [];
    this.scrollMultiply = 0.1;
  }

  addHud() {
    this.scoreText = this.add.text(16, 20, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  }

  addSfxSounds() {
    this.bgMusic = this.sound.add('bg_sound', { volume: 0.2, loop: true, delay: 5000 });
    this.gunShot = this.sound.add('gun_shot', { volume: 0.4, loop: false });
    this.zombieEffect = this.sound.add('zombie_idle_sound', {
      volume: 0.1, loop: true, mute: false, rate: 0.7, detune: 0, delay: 0,
    });
  }

  // fazer ainda

  addParallaxBackground() {
    for (let i = 1; i < 10; i += 1) {
      const background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.model.backgroundHeight, `bg_${i}`).setOrigin(0, 0).setScrollFactor(0).setY(this.model.backgroundOffset);
      this.backgroundLayers.push(background);
    }
  }

  addTilemapLayers() {
    const groundSet = this.map.addTilesetImage('GrayGround', 'gray_ground_tile');
    const bottomGroundSet = this.map.addTilesetImage('GrayBottom', 'gray_bottom_tile');
    const waterSet = this.map.addTilesetImage('WaterTile', 'water_tile');
    const ObjectSet = this.map.addTilesetImage('PlantObjects', 'object_tile');
    const bridgeSet = this.map.addTilesetImage('BridgeTile', 'bridge_tile');
    const treelimbSet = this.map.addTilesetImage('TreeLimb', 'treelimb_tile');
    const colorSet = this.map.addTilesetImage('SolidColors', 'color_tile');

    this.groundLayer = this.map.createLayer('GroundLayer', [groundSet, bottomGroundSet, treelimbSet, bridgeSet, colorSet]);
    this.backgroundLayer = this.map.createLayer('BackgroundGround', [waterSet, groundSet, treelimbSet]);
    this.waterLayer = this.map.createLayer('WaterLayer', waterSet);
    this.objectLayer = this.map.createLayer('Objects', [bridgeSet, ObjectSet]);
  }

  create() {
    this.model = this.sys.game.globals.model.gameOptions();
    this.sys.game.globals.bgMusic.stop();


    this.addSfxSounds();

    this.addParallaxBackground();

    // score hud
    this.addHud();


    // ground tilemap
    this.map = this.add.tilemap('tilemap');
  }

  update() {
   
}
}