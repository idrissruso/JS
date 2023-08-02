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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const disTransactions = function (acc) {
  containerMovements.innerHTML = '';
  for (const [i, mv] of acc.movements.entries()) {
    let type = mv > 0 ? 'deposit' : 'withdrawal';
    let html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mv}€</div>
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
  labelBalance.textContent = `${acc.balance} €`;
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
  labelSumOut.textContent = `${sumOut}€`;
  labelSumIn.textContent = `${sumIn}€`;
  const interest = acc.movements
    .filter(movement => movement > 0)
    .map(movement => (movement * 1.2) / 100)
    .filter(movement => movement > 1)
    .reduce((acc, mv) => acc + mv, 0);
  labelSumInterest.textContent = `${interest}€`;
};

/////////////////////////////////////////////////
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
    updateUI(loggedInAccount);
  }
});

//update UI
const updateUI = function (acc) {
  disTransactions(acc);
  calDisplayBal(acc);
  calcDisplaySummaries(acc);
};
