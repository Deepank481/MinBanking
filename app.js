"use strict";

//Three Accounts created
const account1 = {
  fullName: "Deepank Pant",
  accountNo: "0000012345",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500.0, 4000.0, -3000.0, 3200.0, -6000.0, 7000.0],
  interestRate: 1.5,
  pin: 1111,
  isActive: true,
};

const account2 = {
  fullName: "Aditya Dev",
  accountNo: "0000054321",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [-2500.0, 4000.0, -3000.0, 3200.0, 6000.0, 7000.0],
  interestRate: 2.5,
  pin: 2222,
  isActive: true,
};

const account3 = {
  fullName: "Piyush Lohani",
  accountNo: "0000067890",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500.0, 4000.0, 3000.0, -3200.0, -6000.0, 7000.0],
  interestRate: 3.5,
  pin: 3333,
  isActive: true,
};

const accounts = [account1, account2, account3];
let currAccountSelected = null;
let isTransSorted = false;

//Fetching elements
const transactionList = document.getElementById("transaction-list");
const accountSummary = document.getElementById("account-summary");
const userName = document.getElementById("user-id");
const userPin = document.getElementById("user-pin");
const submitBtn = document.getElementById("submit-btn");
const receiverAccountNo = document.getElementById("receiver-account-no");
const amountTransferred = document.getElementById("amount-transferred");
const transferMoneyBtn = document.getElementById("transfer-money-btn");
const closeUserName = document.getElementById("close-user-name");
const closeUserPin = document.getElementById("close-user-pin");
const closeAccountBtn = document.getElementById("close-account-btn");
const loanAmount = document.getElementById("loan-amount");
const requestLoanBtn = document.getElementById("request-loan-btn");
const sortTransBtn = document.getElementById("sort-trans-btn");

//Registering event listener
submitBtn.addEventListener("click", login);
transferMoneyBtn.addEventListener("click", transferMoney);
closeAccountBtn.addEventListener("click", closeUserAccount);
requestLoanBtn.addEventListener("click", requestLoan);
sortTransBtn.addEventListener("click", sortTransactions);

//functions to perform the app logic
function displayUserData(acc, sort = false) {
  transactionList.innerHTML = "";
  const transactions = sort
    ? acc.transactionHistory.slice().sort((a, b) => a - b)
    : acc.transactionHistory;
  transactions.forEach(function (trans, i) {
    const color = trans > 0 ? "green" : "red";
    const html = `<li class="transaction-item"><pre style="color: ${color};">Transaction ${
      i + 1
    }       ${trans}</pre></li>`;

    transactionList.insertAdjacentHTML("afterbegin", html);
  });
}

const createUserName = function (acc) {
  acc.forEach((account) => {
    account.userName = account.fullName
      .toLowerCase()
      .split(" ")
      .map((val) => val[0])
      .join("");
  });
};

const calcDisplaySummary = function (acc) {
  accountSummary.innerHTML = "";
  acc.balance = acc.transactionHistory.reduce((acc, curr) => acc + curr);
  const totalDeposits = acc.transactionHistory
    .filter((val) => val > 0)
    .reduce((acc, curr) => acc + curr);
  const totalWithdrawls = acc.transactionHistory
    .filter((val) => val < 0)
    .reduce((acc, curr) => acc + curr);
  const interest = acc.transactionHistory
    .filter((val) => val > 0)
    .map((val) => val * (acc.interestRate / 100))
    .reduce((acc, curr) => acc + curr);
  const html = `<p><strong>Account Number:</strong> ${acc.accountNo}</p>
                <p><strong>Account Holder:</strong> ${acc.fullName}</p>
                <p><strong>Account Balance:</strong> ${acc.balance} Rs</p>
                <p><strong>Account Summary:</strong><br>Deposit:${totalDeposits}, <br> Withdrawl: ${Math.abs(
    totalWithdrawls
  )} <br> Interest Earned: ${interest}</p>`;
  accountSummary.insertAdjacentHTML("beforeend", html);
};

function updateUI(acc) {
  calcDisplaySummary(acc);
  displayUserData(acc, isTransSorted);
}

function resetUI() {
  accountSummary.innerHTML = "";
  transactionList.innerHTML = "";
}

//Function for event handeling
function login(e) {
  e.preventDefault();
  currAccountSelected = accounts.find((acc) => acc.userName === userName.value);
  if (currAccountSelected?.pin.toString() === userPin.value) {
    updateUI(currAccountSelected);
  }
}

function transferMoney(e) {
  e.preventDefault();
  const receiverAccount = accounts.find(
    (acc) => acc.accountNo === receiverAccountNo.value
  );
  const amount = parseFloat(amountTransferred.value);
  amountTransferred.value = "";
  receiverAccountNo.value = "";

  if (
    amount > 0 &&
    receiverAccount &&
    currAccountSelected.balance >= amount &&
    currAccountSelected.accountNo !== receiverAccount.accountNo
  ) {
    receiverAccount.transactionHistory.push(amount);
    currAccountSelected.transactionHistory.push(-amount);
    updateUI(currAccountSelected);
  }
}

function closeUserAccount(e) {
  e.preventDefault();
  if (
    closeUserName.value === currAccountSelected?.userName &&
    closeUserPin.value === currAccountSelected?.pin.toString()
  ) {
    const index = accounts.findIndex(
      (acc) =>
        acc.pin === currAccountSelected.pin &&
        acc.userName === currAccountSelected.userName
    );
    accounts.splice(index, 1);
    resetUI();
  }
  closeUserName.value = "";
  closeUserPin.value = "";
}

function requestLoan(e) {
  e.preventDefault();
  const loan = parseFloat(loanAmount.value);
  if (
    currAccountSelected.transactionHistory.some((trans) => trans >= loan / 10)
  ) {
    currAccountSelected.transactionHistory.push(loan);
    updateUI(currAccountSelected);
  }
  loanAmount.value = "";
}

function sortTransactions(e) {
  e.preventDefault();
  isTransSorted = !isTransSorted;
  displayUserData(currAccountSelected, isTransSorted);
}

//displayUserData(account1.transactionHistory);
createUserName(accounts);
