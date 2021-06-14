import Phaser from 'phaser';

const score = { 
	"user": "John Doe",
	"score": 42
};

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7igtBCocAtE2Il7lPcAc/scores';

// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(score),
// }).then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.log.error('Error:', error);
//   });

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.log.error('Error:', error);
  });

export default class leaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }
}