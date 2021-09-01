const { Block } = require("./Block");
const { Blockchain } = require("./Blockchain");
const { Transaction } = require("./Transaction");

const myCoin = new Blockchain();
console.log("Create Transaction 1...");
myCoin.createTransaction(new Transaction("a1", "a2", 300));
console.log("Create Transaction 2...");
myCoin.createTransaction(new Transaction("a2", "a1", 100));
myCoin.minePendingTransaction("alex");
myCoin.minePendingTransaction();
console.log(JSON.stringify(myCoin, null, 2));
console.log("a1 balance is:", myCoin.getBalance("a1"));
console.log("a2 balance is:", myCoin.getBalance("a2"));
console.log("alex balance is:", myCoin.getBalance("alex"));
