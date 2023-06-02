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

  addPlayer() {
    this.player = this.physics.add.sprite(this.model.playerStartPositionX, this.model.playerStartPositionY, 'idle_gun_0')
    this.player.setSize(this.player.width / 2, this.player.height)
    this.player.idDead = false;
    this.player.setScale(this.model.playerScale)
    this.playerHealth = 1;
    this.canDoubleJump = true;
    this.isWaking = false;
    this.facing = 'right'
  }

  addZombieSound(zombie) {
    if((zombie.anims.currentAnim.key === 'walk-zombie' || zombie.anims.currentAnim.key === 'run-zombie') && zombie.isWaking === false ) {
      this.zombieEffect.play();
      zombie.isWaking = true;
    }
  }

  addEnemies() {
    this.zombiesLayer = this.map.getObjectLayer('ZombiesLayer')
    this.zombieLayer.objects.forEach(zombieObj => {
      const zombie = this.zombies.get(zombieObj.x, zombieObj.y, 'zombie_idle_0').setScale(0.23)
      zombie.play('idle-zombie')
      zombie.health = 20;
      zombie.dead = false;
      zombie.hurt = false; 
      zombie.isWaking = false; 
      zombie.on('animationrepeat', () => {
        this.addZombieSound(zombie)
      })
    });
  }

  create() {
    // score
    this.score = 0;
    
    this.model = this.sys.game.globals.model.gameOptions();
    this.sys.game.globals.bgMusic.stop();

    this.addSfxSounds();

    // play bgmusic

    this.bgMusic.play();

    this.addParallaxBackground();

    // score hud
    this.addHud();


    // ground tilemap
    this.map = this.add.tilemap('tilemap');

    this.addTilemapLayers();

    // adicionar colisão a algumas camadas de blocos
    this.groundLayer.setCollisionByExclusion(-1, true)
    this.waterLayer.setCollisionByExclusion(-1, true)

    // add Player
    this.addPlayer();

    // add grupo de inimigos
    this.zombies = this.physics.add.group();
    
    // this.addEnemies()
    this.cursors = this.input.keyboard.createCursorKeys();
  
    // add colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.physicsLayer); 
    this.physics.add.collider(this.groundLayer, this.zombies);
    this.physics.add.collider(this.player, this.waterLayer, (player) => {
      player.isDead = true;
    })
    
    // create main camera

    this.myCam = this.cameras.main  
    this.myCam.setBounds(0, 0, this.sys.game.config.width * 24, this.sys.game.config.height)

    this.myCam.startFollow(this.player)
  }

  scoreUp(score) {
    return score  + 10
  }

  // rolagem de fundo
  backgroundScroll() {
    this.backgroundLayers.forEach(background => {
      background.tilePositionX = this.myCam.scrollX * this.scrollMultiply;
      this.scrollMultiply += 0.1;
    })
    this.scrollMultiply = 0.1;
  }

  playerProperties(side, model) {
    let velocity = model.playerVelocity;
    let scale = model.playerScale;
    let offsetX;

    if (side === 'left') {
      velocity *= -1;
      scale *= -1;
      offsetX = model.leftPlayerOffset;
    } else {
      offsetX = model.rightPlayerOffset;
    }
    return {
      velocity,
      offsetX,
      scale,
    };
  }

  playerIdle() {
    this.isWaking = false;
    this.player.play('idle-gun', true);
    this.player.setVelocityX(0);
  }

  playerWalkAnimation() {
    if (this.player.body.onFloor()) {
      this.player.anims.play('run-gun', true);
    }
  }

  playerMove(side) {
    const playerSideProperties = this.playerProperties(side, this.model);
    this.isWaking = true;
    this.facing = side;
    this.player.setVelocityX(playerSideProperties.velocity);
    this.player.setOffset(playerSideProperties.offsetX, 0);
    this.player.scaleX = playerSideProperties.scale;
  }

  // killGame(boolean) {
  //   this.backgroundLayer = []

  //   this.scene.start('GameOver', {
  //     complete: boolean,
  //     score: this.score,
  //   })
  //   this.bgMusic.stop()
  //   this.zombieEffect.stop()
  // }

  // killPlayer() {
  //   this.player.setVelocity(0);
  //   this.player.play('hurt-gun', true);
  //   this.player.on('animationcomplete', () => {
  //     this.killGame(false);
  //   });
  // }

  playerJump(jumpPressed) {
    if (!jumpPressed) return;
    if (this.player.body.onFloor()) {
      this.canDoubleJump = true;
      this.player.anims.play('jump-gun');
      this.player.body.setVelocityY(-200);
    } else if (this.canDoubleJump) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play('jump-gun');
      this.canDoubleJump = false;
    }
  }

  update() {
    // player movement

    if (this.cursors.left.isDown && this.player.x > 0 && !this.player.isDead) {
      this.playerMove('left');
      this.playerWalkAnimation();
    } else if (this.cursors.right.isDown && this.player.x < this.model.tileLength
      && !this.player.isDead) {
      this.playerMove('right');
      this.playerWalkAnimation();
    }

    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    this.playerJump(jumpPressed);


    this.scoreText.setX(this.myCam.scrollX + 20);
    this.backgroundScroll();
  }
}