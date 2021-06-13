import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 600 },
    },
  },
};
