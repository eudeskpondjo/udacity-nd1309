/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./model/Block').Block;
const Star = require('./model/Star').Star;
const StarRequestModel = require('./model/StarRequestModel').StarRequestModel;

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock() {
        // Add your code here
        let self = this;
        self.getBlockHeight()
            .then(function (blockCount) {
                if (blockCount == 0) {
                    let genesisStar = new Star("70° 21' 0.6", "9h 26m 10.0s", "This is my Genesis Star.");
                    genesisStar.story = new Buffer(genesisStar.story).toString('hex');
                    let genesisStarRequestModel = new StarRequestModel("1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex", genesisStar);
                    self.addBlock(new Block(genesisStarRequestModel));
                }
            })
            .catch(function (err) {
                console.log(err);
                reject(new Error("ERROR_BLOCKCH_BLOCK_GEN"));
            });

    }

    // Get block height, it is a helper method that return the height of the blockchain
    getBlockHeight() {
        // Add your code here
        let self = this;
        return new Promise(function (resolve, reject) {
            self.bd.getBlocksCount()
                .then(function (count) {
                    resolve(count);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_HEIGHT"));
                });
        });
    }

    // Add new block
    addBlock(block) {
        // Add your code here
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.getBlockHeight()
                .then(function (blockCount) { // get the block height
                    block.height = blockCount;
                })
                .then(function () { // get the previous block
                    if (block.height > 0) {
                        return self.getBlock(block.height - 1);
                    }
                })
                .then(function (previousBlock) { // Set the hash of the previous block
                    if (block.height > 0) {
                        block.previousblockhash = previousBlock.hash;
                    }
                })
                .then(function () { // Save the new bloc in the DB
                    block.time = new Date().getTime().toString().slice(0, -3);
                    block.hash = SHA256(JSON.stringify(block)).toString();
                    return self.bd.addLevelDBData(block.height, JSON.stringify(block).toString());
                })
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_ADD"));
                });
        });
    }

    // Get Block By Height
    getBlock(height) {
        // Add your code here
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.bd.getLevelDBData(height)
                .then(function (block) {
                    resolve(block);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_GET_BY_HEIGHT"));
                });
        });
    }

    // Get Block By wallet address
    getBlockByAddress(address) {
        // Add your code here
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.bd.getBlockByAddress(address)
                .then(function (result) {
                    resolve(result);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_GET_BY_ADDRESS"));
                });
        });
    }

        // Get Block By hash
        getBlockByHash(hash) {
            // Add your code here
            let self = this;
            return new Promise(function (resolve, reject) {
                // Add your code here, remember in Promises you need to resolve() or reject() 
                self.bd.getBlockByHash(hash)
                    .then(function (result) {
                        resolve(result);
                    })
                    .catch(function (err) {
                        console.log(err);
                        reject(new Error("ERROR_BLOCKCH_BLOCK_GET_BY_HASH"));
                    });
            });
        }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.getBlock(height)
                .then(function (blockToValidate) { // get the block to validate
                    let oldBlockHash = blockToValidate.hash;
                    blockToValidate.hash = "";
                    let newBlockHash = SHA256(JSON.stringify(blockToValidate)).toString();
                    resolve(oldBlockHash == newBlockHash);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_VALIDATE"));
                });
        });
    }

    // Validate if Block hash is equal to the next block previousBlockHash
    isBlockValidAndBlockHashEqualToNextPreviousHash(height, nextBlockHeight) {
        // Add your code here
        let self = this;
        let currentBlockHash = "";
        let nextBlockPreviousBlockHash = "";
        let isBlockValid;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.validateBlock(height)
                .then(function (result) {
                    isBlockValid = result;
                    if (height == nextBlockHeight) {
                        resolve(isBlockValid);
                    } else {
                        return self.getBlock(height);
                    }
                })
                .then(function (currentBlock) { // get the current block
                    currentBlockHash = currentBlock.hash;
                    return self.getBlock(nextBlockHeight);
                })
                .then(function (nextBlock) { // get the next block
                    nextBlockPreviousBlockHash = nextBlock.previousblockhash;
                    resolve(isBlockValid && (nextBlockPreviousBlockHash == currentBlockHash));
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_BLOCKCH_BLOCK_IS_VALID"));
                });
        });
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
        let self = this;
        let numberOfBlock = 0;
        let errorLog = [];
        let promises = [];
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.getBlockHeight()
                .then(function (blockCount) { // get the block height
                    numberOfBlock = blockCount;
                })
                .then(function () { // get the previous block
                    for (var i = 0; i < numberOfBlock; i++) {
                        var j = i + 1;
                        if (i == (numberOfBlock - 1)) {
                            j = i;
                        }
                        promises.push(self.isBlockValidAndBlockHashEqualToNextPreviousHash(i, j));
                    }
                    return Promise.all(promises);
                })
                .then(function (result) {
                    result.forEach(function (item, j) {
                        if (item == false) {
                            errorLog.push(j);
                        }
                    });
                    resolve(errorLog);
                })
                .catch(function (err) {
                    reject(new Error("ERROR_BLOCKCH_CHAIN_VALIDATE"));
                });
        });
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err) });
        });
    }

}

module.exports.Blockchain = Blockchain;
