"use strict";

//Three Accounts created
const account1 = {
  fullName: "Deepank Pant",
  accountNo: "0000012345",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, -3000, 3200, -6000, 7000],
  interestRate: 1.5,
};

const account2 = {
  fullName: "Aditya Dev",
  accountNo: "0000054321",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [-2500, 4000, -3000, 3200, 6000, 7000],
  interestRate: 2.5,
};

const account3 = {
  fullName: "Piyush Lohani",
  accountNo: "0000067890",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, 3000, -3200, -6000, 7000],
  interestRate: 3.5,
};

const accounts = [account1, account2, account3];

//Fetching elements
const transactionList = document.getElementById("transaction-list");

function displayUserData(transactionHistory) {
  transactionList.innerHTML = "";
  transactionHistory.forEach(function (trans, i) {
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

displayUserData(account1.transactionHistory);
createUserName(accounts);
console.log(accounts);
