import Phaser from 'phaser';

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
    const totalWidth = width * 10;

    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createBGLoop(this, totalWidth, 'mountain', 0.25);
    createBGLoop(this, totalWidth, 'plateau', 0.5);
    createBGLoop(this, totalWidth, 'ground', 1);
    createBGLoop(this, totalWidth, 'plant', 1.25);

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