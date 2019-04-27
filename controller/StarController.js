const Joi = require('joi');
const BlockClass = require('../model/Block.js');
const BlockChain = require('../BlockChain.js');
const Mempool = require('../Mempool.js');

/**
 * Controller Definition to encapsulate routes to work with Stars
 */
class StarRegistrationController {

    /**
     * Constructor to create a new StarRegistrationController with initialization of all our endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.saveStarInBlockchain();
        this.getStarBlockByHash();
        this.getStarBlockByWalletAddress();
        this.getStarBlockByStarBlockHeight();
    }

    /**
     * Implement a POST endpoint with JSON response that submits the Star information to be saved in the Blockchain. : "/block"
     */
    saveStarInBlockchain() {
        this.server.route({
            method: 'POST',
            path: '/block',
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
     * Implement a GET Endpoint to Get Star block by hash with JSON response. url: "/stars/hash:hash"
     */
    getStarBlockByHash() {
        this.server.route({
            method: 'GET',
            path: '/stars/hash:{hash}',
            handler: async (request, h) => {
                try {
                    const result = await this.myBlockChain.getBlock(request.params.blockheight);
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
                    params: {
                        blockheight: Joi.number().integer().min(0)
                    }
                }
            }
        });
    }

    /**
     * Implement a GET Endpoint to Get Star block by wallet address (blockchain identity) with JSON response. url: "/stars/address:address"
     */
    getStarBlockByWalletAddress() {
        this.server.route({
            method: 'GET',
            path: '/stars/address:{address}',
            handler: async (request, h) => {
                try {
                    const result = await this.myBlockChain.getBlock(request.params.blockheight);
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
                    params: {
                        blockheight: Joi.number().integer().min(0)
                    }
                }
            }
        });
    }

    /**
     * Implement a GET Endpoint to Get star block by star block height with JSON response. url: "block/:starblockheight"
     */
    getStarBlockByStarBlockHeight() {
        this.server.route({
            method: 'GET',
            path: '/block/{starblockheight}',
            handler: async (request, h) => {
                try {
                    const result = await this.myBlockChain.getBlock(request.params.blockheight);
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
                    params: {
                        blockheight: Joi.number().integer().min(0)
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
module.exports = (server) => { return new StarRegistrationController(server); }