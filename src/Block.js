const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.getHash();
    this.nonce = 0;
    // console.log("BLOCK:" + JSON.stringify(this, null, 2));
  }

  getHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficalty) {
    while (this.hash.substring(0, difficalty) !== Array(difficalty + 1).join("0")) {
      this.nonce++;
      this.hash = this.getHash();
    }
    console.log("Block mined:" + this.hash);
  }
}

exports.Block = Block;
