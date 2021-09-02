const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.keyFromPrivate("dc53366d5e4d40b126105f6b1e824dc17c4bccd72c7df64ce4d3293042d54ab2");

const myWalletAddress = key.getPublic("hex");
const { Blockchain } = require("./Blockchain");
const { Transaction } = require("./Transaction");

const myCoin = new Blockchain();
console.log("Create Transaction 1...");

const tx1 = new Transaction(myWalletAddress, "a1", 20);
tx1.sign(key);
myCoin.addTransaction(tx1);
console.log("Create Transaction 2...");

const tx2 = new Transaction(myWalletAddress, "a1", 50);
tx2.sign(key);
myCoin.addTransaction(tx2);

myCoin.minePendingTransaction(myWalletAddress);
myCoin.minePendingTransaction(myWalletAddress);

console.log("a1 balance is:", myCoin.getBalance("a1"));
console.log("alex balance is:", myCoin.getBalance(myWalletAddress));
console.log("Chain Valid:", myCoin.isValid());

myCoin.chain[1].transactions[0].amount = 300;
console.log("Chain Valid:", myCoin.isValid());

// console.log(JSON.stringify(myCoin, null, 2));
