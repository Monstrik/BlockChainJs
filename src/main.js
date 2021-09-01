const { Block } = require("./Block");
const { Blockchain } = require("./Blockchain");

const myCoin = new Blockchain();
console.log("Create Block 1...");

myCoin.addBlock(new Block(1, "01/02/2021", { amount: 10 }));
console.log("Create Block 2...");

myCoin.addBlock(new Block(2, "01/03/2021", { amount: 15 }));
console.log("Create Block 3...");

myCoin.addBlock(new Block(3, "01/04/2021", { amount: 40 }));

console.log(JSON.stringify(myCoin, null, 2));
