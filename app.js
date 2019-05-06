const Hapi = require('hapi');
const Mempool = require('./Mempool.js').Mempool;
const Blockchain = require('./BlockChain.js').Blockchain;

/**
 * Class Definition for the REST API
 */
class WebAPI {

    /**
     * Constructor that allows initialize the class 
     */
    constructor() {
		this.server = Hapi.Server({
            port: 8000,
            host: 'localhost'
        });
        this.myMempool = new Mempool();
        this.myBlockChain = new Blockchain();
        this.initControllers();
        this.start();
    }

    /**
     * Initilization of all the controllers
     */
	initControllers() {
        // require("./controller/BlockController.js")(this.server);
        require("./controller/BlockchainIdValidationController.js")(this.server, this.myMempool);
        require("./controller/StarController.js")(this.server, this.myMempool, this.myBlockChain);
	}
    
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }

}

new WebAPI();