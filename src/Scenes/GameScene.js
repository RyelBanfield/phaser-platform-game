import Phaser from 'phaser';

let player;
let coins;

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
    const totalWidth = width * 4;

    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createBGLoop(this, totalWidth, 'mountain', 0.25);
    createBGLoop(this, totalWidth, 'plateau', 0.5);
    createBGLoop(this, totalWidth, 'ground', 1.25);
    createBGLoop(this, totalWidth, 'plant', 1.25);

    const platforms = this.physics.add.staticGroup();
    platforms.create(width * 0.5, height, 'ground');
    platforms.create(width, height, 'ground');

    platforms.create(800, 700, 'platform');
    platforms.create(1700, 450, 'platform');
    platforms.create(2700, 300, 'platform');
    platforms.create(400, 300, 'platform');

    this.cameras.main.setBounds(0, 0, width * 1.5, height);

    player = this.physics.add.sprite(200, 450, 'playerIdle');
    player.setScale(3);
    player.setSize(40, 50);
    player.body.offset.y = 60;

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

    this.cursors = this.input.keyboard.createCursorKeys();

    coins = this.physics.add.group({
      key: 'coin',
      repeat: 16,
      setXY: { x: 350, y: 0, stepX: 150 },
      setScale: { x: 0.25, y: 0.25 },
    });

    coins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
  }

  update() {
    const cam = this.cameras.main;
    const speed = 5;

    if (player.x <= 100) {
      if (this.cursors.right.isDown) {
        player.flipX = false;
        player.anims.play('run', true);
        player.setVelocityX(400);
        cam.scrollX += speed;
      } else {
        player.anims.play('idle', true);
        player.setVelocityX(0);
      }
    }

    if (player.x > 100) {
      if (this.cursors.right.isDown) {
        player.flipX = false;
        player.anims.play('run', true);
        player.setVelocityX(400);
        if (player.body.velocity.x !== 0) {
          cam.scrollX += speed;
        }
      } else if (this.cursors.left.isDown) {
        player.flipX = true;
        player.anims.play('run', true);
        player.setVelocityX(-400);
        cam.scrollX -= speed;
      } else {
        player.anims.play('idle', true);
        player.setVelocityX(0);
      }
    }

    if (player.x >= 2775) {
      if (this.cursors.left.isDown) {
        player.flipX = true;
        player.anims.play('run', true);
        player.setVelocityX(-400);
        cam.scrollX -= speed;
      } else {
        player.anims.play('idle', true);
        player.setVelocityX(0);
      }
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    if (didPressJump) {
      if (player.body.onFloor()) {
        this.canDoubleJump = true;
        player.setVelocityY(-500);
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        player.setVelocityY(-500);
      }
    }

    if (this.cursors.up.isDown) {
      player.anims.play('jump', true);
    }

    if (!this.cursors.up.isDown && !player.body.onFloor()) {
      player.anims.play('fall', true);
    }
  }
}