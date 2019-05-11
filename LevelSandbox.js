/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';
const hex2ascii = require('hex2ascii');

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key)
                .then(function (value) {
                    let blockInJson = JSON.parse(value);
                    blockInJson.body.star.storyDecoded = hex2ascii(blockInJson.body.star.story);
                    resolve(blockInJson);
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_DB_BLOCK_GET_BY_KEY"));
                });
        });
    }

    // Get data from levelDB by address (Promise)
    getBlockByAddress(address) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            var result = [];
            self.db.createValueStream()
                .on('data', function (data) {
                    if (JSON.parse(data).body.address === address) {
                        let blockInJson = JSON.parse(data);
                        blockInJson.body.star.storyDecoded = hex2ascii(blockInJson.body.star.story);
                        result.push(blockInJson);
                    }
                })
                .on('error', function (err) {
                    console.log(err);
                    reject(new Error("ERROR_DB_BLOCK_GET_BY_ADDRESS"));
                })
                .on('close', function () {
                    resolve(result);
                });
        });
    }

    // Get data from levelDB by hash (Promise)
    getBlockByHash(hash) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            var result = "";
            self.db.createValueStream()
                .on('data', function (data) {
                    if (JSON.parse(data).hash === hash) {
                        let blockInJson = JSON.parse(data);
                        blockInJson.body.star.storyDecoded = hex2ascii(blockInJson.body.star.story);
                        result = blockInJson;
                    }
                })
                .on('error', function (err) {
                    console.log(err);
                    reject(new Error("ERROR_DB_BLOCK_GET_BY_HASH"));
                })
                .on('close', function () {
                    resolve(result);
                });
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(key, value)
                .then(() => {
                    self.db.get(key)
                        .then(function (result) {
                            let blockInJson = JSON.parse(result);
                            blockInJson.body.star.storyDecoded = hex2ascii(blockInJson.body.star.story);
                            resolve(blockInJson);
                        })
                        .catch(function (err) {
                            console.log(err);
                            reject(new Error("ERROR_DB_BLOCK_GET_BY_KEY"));
                        });
                })
                .catch(function (err) {
                    console.log(err);
                    reject(new Error("ERROR_DB_BLOCK_ADD"));
                });
        });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            let i = 0;
            self.db.createReadStream()
                .on('data', function (data) {
                    // Count each object inserted
                    i++;
                })
                .on('error', function (err) {
                    // reject with error
                    console.log(err);
                    reject(new Error("ERROR_DB_BLOCK_COUNT"));
                })
                .on('close', function () {
                    //resolve with the count value
                    resolve(i);
                });
        });
    }
}

module.exports.LevelSandbox = LevelSandbox;
