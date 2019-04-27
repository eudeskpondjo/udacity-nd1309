const Hapi = require('hapi');

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
        this.initControllers();
        this.start();
    }

    /**
     * Initilization of all the controllers
     */
	initControllers() {
        require("./controller/BlockController.js")(this.server);
        require("./controller/BlockchainIdValidationController.js")(this.server);
        require("./controller/StarController.js/index.js.js")(this.server);
	}
    
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }

}

new WebAPI();