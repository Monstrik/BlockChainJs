const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  getHash() {
    return SHA256(this.from + this.to + this.amount).toString();
  }

  sign(key) {
    if (key.getPublic("hex") !== this.from) throw new Error("Can't sign transactions from other wallets");
    const hash = this.getHash();
    const sig = key.sign(hash, "base64");
    this.signature = sig.toDER("hex");
  }
  isValid() {
    if (this.from === null) return true;

    if (!this.signature || this.signature.length === 0) throw new Error("No signature in this transaction");

    const key = ec.keyFromPublic(this.from, "hex");
    return key.verify(this.getHash(), this.signature);
  }
}

exports.Transaction = Transaction;
