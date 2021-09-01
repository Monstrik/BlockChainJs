const { Block } = require("./Block");

class Blockchain {
  constructor() {
    this.chain = [new Block(0, "01/01/2021", "Genesis block", "0")];
    this.difficalty = 4;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficalty);
    this.chain.push(newBlock);
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
