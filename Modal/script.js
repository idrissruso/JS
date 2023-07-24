'use strict';
const btn = document.getElementsByClassName('show-modal');
const modal = document.getElementsByClassName('modal');
const overlay = document.getElementsByClassName('overlay');
const close = document.getElementsByClassName('close-modal');
let shown = false;

function showModal() {
  shown = true;
  modal[0].classList.remove('hidden');
  modal[0].classList.add('show-modal');

  overlay[0].classList.remove('hidden');
}

function closeModal() {
  shown = false;
  modal[0].classList.remove('show-modal');
  modal[0].classList.add('hidden');

  overlay[0].classList.add('hidden');
}

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', showModal);
}

close[0].addEventListener('click', closeModal);
overlay[0].addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && shown) {
    closeModal();
  }
});
