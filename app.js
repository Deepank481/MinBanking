"use strict";

//Three Accounts created
const account1 = {
  fName: "Deepank",
  lName: "Pant",
  accountNo: "0000012345",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, -3000, 3200, -6000, 7000],
  interestRate: 1.5,
};

const account2 = {
  fName: "Aditya",
  lName: "Dev",
  accountNo: "0000054321",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [-2500, 4000, -3000, 3200, 6000, 7000],
  interestRate: 2.5,
};

const account3 = {
  fName: "Piyush",
  lName: "Lohani",
  accountNo: "0000067890",
  balance: 0,
  summary: [0, 0],
  transactionHistory: [2500, 4000, 3000, -3200, -6000, 7000],
  interestRate: 3.5,
};

//Fetching elements
const transactionList = document.getElementById("transaction-list");

function displayUserData(transactionHistory) {
  transactionHistory.forEach(function (trans, i) {
    const color = trans > 0 ? "green" : "red";
    const html = `<li class="transaction-item"><span style="color: ${color};">Transaction ${
      i + 1
    }     ${trans}</span></li>`;

    transactionList.insertAdjacentHTML("afterbegin", html);
  });
}

displayUserData(account1.transactionHistory);
