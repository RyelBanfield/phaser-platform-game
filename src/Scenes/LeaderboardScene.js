import Phaser from 'phaser';
import config from '../Config/config';
// eslint-disable-next-line import/no-cycle
import { score } from './GameScene';
import Button from '../Objects/Button';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7igtBCocAtE2Il7lPcAc/scores';

export const postScore = (score) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(score),
  }).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.log.error('Error:', error);
    });
};

const getScores = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.log.error('Error:', error);
    });
};

getScores();

export default class leaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.add.text(config.width / 2, config.height / 2, `${config.user}`, { fontSize: '42px', fill: '#fff' });
    this.add.text(config.width / 2, config.height / 2 + 40, `SCORE: ${score.points}`, { fontSize: '42px', fill: '#fff' });

    const resetButton = this.add.text(config.width / 2, config.height / 2 + 100, 'Restart', { fontSize: '42px', fill: '#0f0' });
    resetButton.setInteractive();

    resetButton.on('pointerdown', () => { window.location.reload(); });
  }
}