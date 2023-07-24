'use strict';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const user_g = document.getElementById('number');
const btn = document.getElementById('button');
const score = document.getElementsByClassName('score')[0];
console.log(score);

btn.addEventListener('click', () => {
  score.textContent = user_g.value;
});
