const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, transactions = [], previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.getHash();
    this.nonce = 0;
    // console.log("BLOCK:" + JSON.stringify(this, null, 2));
  }

  getHash() {
    return SHA256(
      this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.getHash();
    }
    console.log("Block mined:" + this.hash);
  }
}

exports.Block = Block;
