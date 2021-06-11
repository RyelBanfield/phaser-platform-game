import Phaser from 'phaser';

let player;

const createBGLoop = (scene, totalWidth, texture, scrollFactor) => {
  const textureWidth = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / textureWidth) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; i += 1) {
    const bgImage = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += bgImage.width;
  }
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;
    const totalWidth = width * 2;

    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createBGLoop(this, totalWidth, 'mountain', 0.25);
    createBGLoop(this, totalWidth, 'plateau', 0.5);
    createBGLoop(this, totalWidth, 'ground', 1.25);
    createBGLoop(this, totalWidth, 'plant', 1.25);
    const platforms = this.physics.add.staticGroup();
    platforms.create(width * 0.5, height, 'ground');

    this.cameras.main.setBounds(0, 0, width * 2, height);

    player = this.physics.add.sprite(100, 450, 'playerIdle');
    player.setScale(3);

    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 7 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 2 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('playerFall', { start: 0, end: 2 }),
      frameRate: 15,
      repeat: -1,
    });

    this.physics.add.collider(player, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.right.isDown) {
      player.flipX = false;
      player.anims.play('run', true);
      player.setVelocityX(400);
    } else if (this.cursors.left.isDown) {
      player.flipX = true;
      player.anims.play('run', true);
      player.setVelocityX(-400);
    } else {
      player.anims.play('idle', true);
      player.setVelocityX(0);
    }
    if (this.cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-600);
      player.anims.play('jump', true);
    }
    if (!player.body.touching.down) {
      player.anims.play('fall', true);
    }
  }
}