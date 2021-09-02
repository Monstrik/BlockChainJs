const { Block } = require("./Block");
const { Transaction } = require("./Transaction");

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now(), [], "0")];
    this.difficulty = 4;
    this.pendingTransaction = [];
    this.miningReward = 100;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress) {
    const newBlock = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    this.pendingTransaction = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  addTransaction(transaction) {
    if (!transaction.from || !transaction.to) throw new Error('Transaction must include "to" and "from" fields');
    if (!transaction.isValid()) throw new Error("Can't add not valid transaction");
    this.pendingTransaction.push(transaction);
  }

  getBalance(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.to === address) balance += transaction.amount;
        if (transaction.from === address) balance -= transaction.amount;
      }
    }
    return balance;
  }

  isValid() {
    for (let i = 1; i < this.chain.length - 1; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (!currentBlock.hasValidTransactions()) return false;
      if (currentBlock.hash !== currentBlock.getHash()) return false;
      if (previousBlock.hash !== currentBlock.previousHash) return false;
    }
    return true;
  }
}
exports.Blockchain = Blockchain;
