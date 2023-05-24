import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 400, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 80,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 125,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 170,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 410, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    // load assets needed in our game

    // font
    this.load.image('gamma', 'assets/Font/gamma.png');
    this.load.json('gamma_json', 'assets/Font/gamma.json');

    // ui
    this.load.html('nameform', 'assets/text/inputField.html');
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    // background

    this.load.image('bg_1', 'assets/Background/Layer_0010_1.png');
    this.load.image('bg_2', 'assets/Background/Layer_0009_2.png');
    this.load.image('bg_3', 'assets/Background/Layer_0008_3.png');
    this.load.image('bg_4', 'assets/Background/Layer_0007_Lights.png');
    this.load.image('bg_5', 'assets/Background/Layer_0006_4.png');
    this.load.image('bg_6', 'assets/Background/Layer_0005_5.png');
    this.load.image('bg_7', 'assets/Background/Layer_0004_Lights.png');
    this.load.image('bg_8', 'assets/Background/Layer_0003_6.png');
    this.load.image('bg_9', 'assets/Background/Layer_0002_7.png');
    this.load.image('bg_10', 'assets/Background/Layer_0001_8.png');
    this.load.image('bg_11', 'assets/Background/Layer_0000_9.png');

    // tilemaps
    // tiles
    this.load.image('gray_ground_tile', 'assets/jungle/tile_jungle_ground_grey.png');
    this.load.image('object_tile', 'assets/jungle/tile_jungle_plants_objects.png');
    this.load.image('gray_bottom_tile', 'assets/jungle/tile_jungle_bottom_grey.png');
    this.load.image('water_tile', 'assets/jungle/tile_jungle_water.png');
    this.load.image('bridge_tile', 'assets/jungle/tile_jungle_bridge.png');
    this.load.image('treelimb_tile', 'assets/jungle/tile_jungle_treelimb.png');
    this.load.image('color_tile', 'assets/jungle/bg_solid_colors.png');
    // tilemap
    this.load.tilemapTiledJSON('tilemap', 'assets/GrayGround.json');

    // background tilemap
    this.load.tilemapTiledJSON('backgroundTilemap', 'assets/BackgroundTile.json');

    // player gun mode
    // idle
    this.load.image('idle_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_000.png');
    this.load.image('idle_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_001.png');
    this.load.image('idle_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_002.png');
    this.load.image('idle_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_003.png');
    this.load.image('idle_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_004.png');
    this.load.image('idle_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_005.png');
    this.load.image('idle_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_006.png');
    this.load.image('idle_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_007.png');
    this.load.image('idle_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_008.png');
    this.load.image('idle_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_009.png');

    // run
    this.load.image('run_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_000.png');
    this.load.image('run_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_001.png');
    this.load.image('run_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_002.png');
    this.load.image('run_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_003.png');
    this.load.image('run_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_004.png');
    this.load.image('run_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_005.png');
    this.load.image('run_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_006.png');
    this.load.image('run_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_007.png');
    this.load.image('run_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_008.png');
    this.load.image('run_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_009.png');

    // jump
    this.load.image('jump_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/05-Jump/E_E_Gun__Jump_000.png');

    // hurt
    this.load.image('hurt_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_000.png');
    this.load.image('hurt_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_001.png');
    this.load.image('hurt_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_002.png');
    this.load.image('hurt_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_003.png');
    this.load.image('hurt_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_004.png');
    this.load.image('hurt_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_005.png');
    this.load.image('hurt_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_006.png');
    this.load.image('hurt_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_007.png');
    this.load.image('hurt_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_008.png');
    this.load.image('hurt_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_009.png');

    // game sounds
    this.load.audio('bg_sound', ['assets/bg-music.ogg']);
    this.load.audio('zombie_dead_sound', ['assets/sfx/dead-zombie.mp3']);
    this.load.audio('zombie_run_sound', ['assets/sfx/run-zombie.mp3']);
    this.load.audio('zombie_hurt_sound', ['assets/sfx/hurt-zombie.wav']);
    this.load.audio('zombie_idle_sound', ['assets/sfx/zombie-idle.mp3']);
    this.load.audio('gun_shot', ['assets/sfx/shot_01.ogg']);
    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
  }

  create() {}
  // Garante que a cena vai ser toda redenrizada

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 1) {
      this.scene.start('Title');
    }
  }
}
