/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';

class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key, function(err, value) {
                if (err) { 
                    reject(err); 
                } else {
                    resolve(value);
                }
            });
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(key, value, function(err) {
                if (err) { 
                    reject(err); 
                } else {
                    resolve("Block successfuly added !!! " + value);
                }
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
                    reject(err);
                })
                .on('close', function () {
                    //resolve with the count value
                    resolve(i);
                });
        });
    }
}

module.exports.LevelSandbox = LevelSandbox;
