import Phaser from 'phaser';
import gameConfig from '../Config/config';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Name');
  }

  create() {
    const element = this.add.dom(window.innerWidth / 2, window.innerHeight / 6).createFromCache('nameForm');

    element.addListener('click');

    element.on('click', () => {
      const inputText = document.querySelector('.nameField');
      if (inputText.value !== '') {
        gameConfig.user = inputText.value;
        this.scene.start('Game');
      }
    });
  }
}