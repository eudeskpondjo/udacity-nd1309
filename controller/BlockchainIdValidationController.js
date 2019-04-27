const Joi = require('joi');
const BlockClass = require('../Block.js');
const Mempool = require('../Mempool.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockchainIdValidationController {

    /**
     * Constructor to create a new BlockchainIdValidationController with initialization of all our endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.validateRequest();
        this.validateMessageSignature();
    }

    /**
     * Implement a POST endpoint to validate request with JSON response : "/requestValidation"
     */
    validateRequest() {
        this.server.route({
            method: 'POST',
            path: '/requestValidation',
            handler: async (request, h) => {
                try {
                    let blockTest = new BlockClass.Block(request.payload.body);
                    const result = await this.myBlockChain.addBlock(blockTest);
                    const response = h.response(result);
                    response.code(200);
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                } catch (err) {
                    throw err;
                }
            },
            options: {
                validate: {
                    payload: {
                        body: Joi.string().required()
                    }
                }
            }
        });
    }

    /**
     * Implement a POST endpoint validates message signature with JSON response. : "/message-signature/validate"
     */
    validateMessageSignature() {
        this.server.route({
            method: 'POST',
            path: '/message-signature/validate',
            handler: async (request, h) => {
                try {
                    let blockTest = new BlockClass.Block(request.payload.body);
                    const result = await this.myBlockChain.addBlock(blockTest);
                    const response = h.response(result);
                    response.code(200);
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                } catch (err) {
                    throw err;
                }
            },
            options: {
                validate: {
                    payload: {
                        body: Joi.string().required()
                    }
                }
            }
        });
    }
}

/**
 * Exporting the BlockchainIdValidationController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockchainIdValidationController(server); }