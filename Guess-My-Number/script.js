'use strict';

let hearts = 20;
let high_s = 0;
const user_g = document.getElementById('number');
const btn = document.getElementById('button');
const score = document.getElementsByClassName('score')[0];
const message = document.getElementsByClassName('message')[0];
let randomNumber = getRandomNumber(1, 20);
let highScore = document.getElementsByClassName('highcore')[0];
score.textContent = hearts;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function reset() {
  setTimeout(() => {
    hearts = 20;
    score.textContent = hearts;
    document.body.style.backgroundColor = '#222';
  }, 1000);
}

function check() {
  if (hearts > high_s) {
    high_s = hearts;
    highScore.textContent = high_s;
  }
}

function handleClick() {
  if (hearts == 0) {
    message.textContent = "🥵 You're a loser !!";
    document.body.style.backgroundColor = 'red';
    reset();
  } else {
    if (user_g.value == randomNumber) {
      message.textContent = '✔️ Correct Number !';
      document.body.style.backgroundColor = 'green';
      reset();
    } else if (user_g.value > randomNumber) {
      hearts -= 1;
      score.textContent = hearts;

      message.textContent = ' ↗️ Too high !';
    } else if (user_g.value < randomNumber) {
      hearts -= 1;
      score.textContent = hearts;

      message.textContent = '↘️ Too low !';
    }
    check();
  }
}

btn.addEventListener('click', handleClick);
