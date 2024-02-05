"use strict";

//Three Accounts created
const account1 = {
  fullName: "Deepank Pant",
  accountNo: "0000012345",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, -3000, 3200, -6000, 7000],
  interestRate: 1.5,
  pin: 1111,
};

const account2 = {
  fullName: "Aditya Dev",
  accountNo: "0000054321",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [-2500, 4000, -3000, 3200, 6000, 7000],
  interestRate: 2.5,
  pin: 2222,
};

const account3 = {
  fullName: "Piyush Lohani",
  accountNo: "0000067890",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, 3000, -3200, -6000, 7000],
  interestRate: 3.5,
  pin: 3333,
};

const accounts = [account1, account2, account3];

//Fetching elements
const transactionList = document.getElementById("transaction-list");
const accountSummary = document.getElementById("account-summary");
const userName = document.getElementById("user-id");
const userPin = document.getElementById("user-pin");
const submitBtn = document.getElementById("submit-btn");

//Registering event listener
submitBtn.addEventListener("click", login);

//functions to perform the app logic
function displayUserData(acc) {
  transactionList.innerHTML = "";
  acc.transactionHistory.forEach(function (trans, i) {
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

function login(e) {
  e.preventDefault();
  let currAccountSelected = accounts.find(
    (acc) => acc.userName === userName.value
  );
  if (currAccountSelected?.pin.toString() === userPin.value) {
    calcDisplaySummary(currAccountSelected);
    displayUserData(currAccountSelected);
  }
}

//displayUserData(account1.transactionHistory);
createUserName(accounts);
