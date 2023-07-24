'use strict';
const players = document.getElementsByClassName('player');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
let currentPlayer = 'player--0';
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
let currentPlayerScore = 0;
const fScore0 = document.querySelector('#score--0');
const fScore1 = document.querySelector('#score--1');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
dice.classList.add('hidden');

function switchPlayer() {
  for (const player of players) {
    player.classList.toggle('player--active');
  }
  currentPlayer = currentPlayer === 'player--0' ? 'player--1' : 'player--0';
  currentPlayerScore = 0;
}

function changeScore(score_) {
  if (currentPlayer == 'player--0') {
    currentScore0.textContent = score_;
  } else if (currentPlayer == 'player--1') {
    currentScore1.textContent = score_;
  }
}

function resetScore() {
  currentScore1.textContent = 0;
  currentScore0.textContent = 0;
  fScore0.textContent = 0;
  fScore1.textContent = 0;
  dice.classList.add('hidden');
}

function rollDice() {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }
  let random = Math.trunc(Math.random() * 6) + 1;
  let score = random;
  currentPlayerScore += score;
  dice.src = `dice-${random}.png`;
  if (random == 1) {
    changeScore(0);
    switchPlayer();
    return;
  } else {
    changeScore(currentPlayerScore);
  }
}

function holdScore() {
  if (currentPlayer == 'player--0') {
    let score = Number(fScore0.textContent) + Number(currentScore0.textContent);
    if (score > 100) {
      alert('player 1 won !! with score : ' + score);
      resetScore();
      return;
    }
    fScore0.textContent = score;
  } else if (currentPlayer == 'player--1') {
    let score = Number(fScore1.textContent) + Number(currentScore1.textContent);
    if (score > 100) {
      alert('player 2 won !! with score : ' + score);
      resetScore();
      return;
    }
    fScore1.textContent = score;
  }
  changeScore(0);
  switchPlayer();
}

btnRoll.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newBtn.addEventListener('click', resetScore);
