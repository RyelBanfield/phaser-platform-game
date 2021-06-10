import Phaser from 'phaser';

const createBGLoop = (scene, count, texture, scrollFactor) => {
  let x = 0;
  for (let i = 0; i < count; i++) {
    const m = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

export default class ParallaxScene extends Phaser.Scene {
  constructor() {
    super('parallax-scene');
  }

  preload() {
    this.load.image('sky', 'assets/BG/sky.png');
    this.load.image('mountain', 'assets/BG/mountains.png');
    this.load.image('plateau', 'assets/BG/plateau.png');
    this.load.image('ground', 'assets/BG/ground.png');
    this.load.image('plant', 'assets/BG/plant.png');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;

    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createBGLoop(this, 10, 'mountain', 0.25);
    createBGLoop(this, 10, 'plateau', 0.5);
    createBGLoop(this, 10, 'ground', 1);
    createBGLoop(this, 10, 'plant', 1.25);

    this.cameras.main.setBounds(0, 0, width * 10, height);
  }

  update() {
    const cam = this.cameras.main;
    const speed = 10;
    if (this.cursors.left.isDown) {
      cam.scrollX -= speed;
    } else if (this.cursors.right.isDown) {
      cam.scrollX += speed;
    }
  }
}