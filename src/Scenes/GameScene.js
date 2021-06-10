import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create() {
    this.scene.start('parallax-scene');
  }
}
