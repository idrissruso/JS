'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2021-01-18T21:31:17.178Z',
    '2021-01-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-02-01T10:17:24.185Z',
    '2021-02-08T14:11:59.604Z',
    '2021-02-26T17:01:17.194Z',
    '2021-02-28T23:36:17.929Z',
    '2021-03-01T10:51:36.790Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const format = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const disTransactions = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const mvs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  for (const [i, mv] of mvs.entries()) {
    const date = new Date(acc.movementsDates[i]);
    const displayDate = pastDate(date);

    let type = mv > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mv.toFixed(2)}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
};

/////////////////////////////////////////////////
const calculateNames = function (accs) {
  accs.forEach(function (acc, i) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

const calDisplayBal = function (acc) {
  acc.balance = acc.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
};

calculateNames(accounts);

/////////////////////////////
//const calMax = function (movements) {
//  const max = movements.reduce(
//    (acc, move) => (acc > move ? acc : move),
//    movements[0]
//  );
//  console.log(max);
//};
//
//calMax(account1.movements);

/////////////////////////////////////////////////
const calcDisplaySummaries = function (acc) {
  const sumIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mv) => acc + mv, 0);
  const sumOut = acc.movements
    .filter(movement => movement < 0)
    .reduce((acc, mv) => acc + mv, 0);
  labelSumOut.textContent = `${sumOut.toFixed(2)}€`;
  labelSumIn.textContent = `${sumIn.toFixed(2)}€`;
  const interest = acc.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * 1.2) / 100)
    .filter(movement => movement > 1)
    .reduce((acc, mv) => acc + mv, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const getDate = function () {
  const now = new Date();
  const day = new Intl.DateTimeFormat('en-US', format).format(now);
  return day;
};

const getDateWithStr = function (dateIsStr) {
  const now = new Date(dateIsStr);
  const day = new Intl.DateTimeFormat('en-US', format).format(now);
  return day;
};

const pastDate = function (date) {
  const now = new Date();
  const date_ = new Date(date);
  const diff = now - date_;
  const day = Math.trunc(diff / (1000 * 60 * 60 * 24));
  if (day === 0) return 'Today';
  if (day === 1) return 'Yesterday';
  if (day <= 7) return `${day} days ago`;
  return getDateWithStr(date);
};

///////////////////Event Handlers/////////////////////
//handle login
let loggedInAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  loggedInAccount = accounts.find(account => account.userName === username);
  if (loggedInAccount?.pin === Number(pin)) {
    labelWelcome.textContent = `Welcome back ${
      loggedInAccount.owner.split(' ')[0]
    }`;
    labelDate.textContent = getDate();
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(loggedInAccount);
  }
});

//handle transfer

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const receiver = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);
  if (
    amount > 0 &&
    receiver &&
    loggedInAccount.balance >= amount &&
    receiver.userName !== loggedInAccount.userName
  ) {
    loggedInAccount.movements.push(-amount);
    receiver.movements.push(amount);
    loggedInAccount.movementsDates.push(new Date().toISOString());
    receiver.movementsDates.push(new Date().toISOString());
    updateUI(loggedInAccount);
  }
});

// handle close account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === loggedInAccount.userName &&
    Number(inputClosePin.value) === loggedInAccount.pin
  ) {
    const index = accounts.findIndex(
      account => account.userName === loggedInAccount.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

//handle loan
btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    loggedInAccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    loggedInAccount.movements.push(amount);
    loggedInAccount.movementsDates.push(new Date().toISOString());
    updateUI(loggedInAccount);
    inputLoanAmount.value = '';
  }
});

//handle sort
let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  disTransactions(loggedInAccount, !sorted);
  sorted = !sorted;
});

//update UI
const updateUI = function (acc) {
  disTransactions(acc);
  calDisplayBal(acc);
  calcDisplaySummaries(acc);
};

//const calcALLMovements = function (accs) {
//  const allMovements = accs.flatMap(acc => acc.movements);
//  console.log(allMovements);
//  const balance = allMovements.reduce((acc, mov) => acc + mov, 0);
//  console.log(balance);
//};
//calcALLMovements(accounts);

//labelWelcome.addEventListener('click', () => {
//  const movements = Array.from(
//    document.querySelectorAll('.movements__value'),
//    el => Number(el.textContent.replace('€', ''))
//  );
//  console.log(movements);
//});
