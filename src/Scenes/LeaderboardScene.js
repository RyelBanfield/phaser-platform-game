import Phaser from 'phaser';
import gameConfig from '../Config/config';

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
    this.add.text(window.innerWidth / 2, 10, `${gameConfig.user}`, { fontSize: '32px', fill: '#fff' });
    this.add.text(window.innerWidth / 2, 40, 'SCORE: 0', { fontSize: '32px', fill: '#fff' });
  }
}