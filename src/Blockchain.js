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

  // addBlock(newBlock) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }
  minePendingTransaction(miningRewardAddress) {
    const newBlock = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    this.pendingTransaction = [new Transaction(null, miningRewardAddress, this.miningReward)];
  }

  createTransaction(transaction) {
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

      if (currentBlock.hash !== currentBlock.getHash()) return false;
      if (previousBlock.hash !== currentBlock.previousHash) return false;
    }
    return true;
  }
}
exports.Blockchain = Blockchain;
