'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const links = document.querySelector('.nav__links');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const options = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

scrollBtn.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });

  clicked.classList.add('operations__tab--active');
  const option = `.operations__content--${clicked.dataset.tab}`;
  options.forEach(o => {
    o.classList.remove('operations__content--active');
  });
  document.querySelector(option).classList.add('operations__content--active');
});

const handleLinkHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== clicked) {
        el.style.opacity = this;
        console.log(this);
      }
    });
  }
};

nav.addEventListener('mouseover', handleLinkHover.bind(0.5));
nav.addEventListener('mouseout', handleLinkHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;
const handleStickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(handleStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const handleSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};

const sectionsObserver = new IntersectionObserver(handleSections, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (sec) {
  sec.classList.add('section--hidden');
  sectionsObserver.observe(sec);
});
