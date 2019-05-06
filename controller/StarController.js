const Joi = require('joi');
const Block = require('../model/Block.js').Block;
const StarRequestModel = require('../model/StarRequestModel').StarRequestModel;
const BlockchainError = require('../model/BlockchainError').BlockchainError;

/**
 * Controller Definition to encapsulate routes to work with Stars
 */
class StarRegistrationController {

    /**
     * Constructor to create a new StarRegistrationController with initialization of all our endpoints
     * @param {*} server 
     */
    constructor(server, mempool, blockchain) {
        this.server = server;
        this.myMempool = mempool;
        this.myBlockChain = blockchain;
        this.saveStarInBlockchain();
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
                    let startRequestObject = new StarRequestModel(request.payload.address, request.payload.star);
                    let isAddressVerified = await this.myMempool.verifyAddressRequest(startRequestObject);
                    if (isAddressVerified) {
                        startRequestObject.star.story = new Buffer(startRequestObject.star.story).toString('hex');
                        let blockToAdd = new Block(startRequestObject);
                        let blockAdded = await this.myBlockChain.addBlock(blockToAdd);
                        const response = h.response(blockAdded);
                        response.code(200);
                        response.header('Content-Type', 'application/json; charset=utf-8');
                        return response;
                    }
                } catch (err) {
                    let errorToReturn = new BlockchainError();
                    switch (err.message) {
                        case "REQUEST_VALIDATION_NOT_EXIST":
                            errorToReturn.setMessage("There is no request validation with the specified address.");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("REQUEST_VALIDATION_NOT_EXIST.");
                            break;
                        default:
                            errorToReturn.setMessage("Unknown error.");
                            errorToReturn.setStatusCode(500);
                            errorToReturn.setError("UNKNOWN_ERROR.");
                    }
                    const response = h.response(errorToReturn);
                    response.code(errorToReturn.getStatusCode());
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                }
            },
            options: {
                validate: {
                    payload: Joi.object({
                        address: Joi.string().required(),
                        star: Joi.object({
                            dec: Joi.string().required(),
                            ra: Joi.string().required(),
                            story: Joi.string().max(500, 'hex').required()
                        })
                    })
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
            path: '/stars/{criteria}',
            handler: async (request, h) => {
                try {
                    const result = await this.myBlockChain.getBlockByCriteria(request.params.criteria);
                    const response = h.response(result);
                    response.code(200);
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                } catch (err) {
                    let errorToReturn = new BlockchainError();
                    switch (err.message) {
                        case "ERROR_BLOCKCH_BLOCK_GET_BY_CRITERIA":
                            errorToReturn.setMessage("Somethings bad happens when retrieving block by criteria");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("ERROR_BLOCKCH_BLOCK_GET_BY_CRITERIA.");
                            break;
                        default:
                            errorToReturn.setMessage("Unknown error.");
                            errorToReturn.setStatusCode(500);
                            errorToReturn.setError("UNKNOWN_ERROR.");
                    }
                    const response = h.response(errorToReturn);
                    response.code(errorToReturn.getStatusCode());
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                }
            },
            options: {
                validate: {
                    params: {
                        criteria: Joi.string().regex(/^(hash|address):[a-zA-z0-9]*$/).min(35).max(70).required()
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
                    const result = await this.myBlockChain.getBlock(request.params.starblockheight);
                    const response = h.response(result);
                    response.code(200);
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                } catch (err) {
                    let errorToReturn = new BlockchainError();
                    switch (err.message) {
                        case "ERROR_BLOCKCH_BLOCK_GET_BY_HEIGHT":
                            errorToReturn.setMessage("Somethings bad happens when retrieving block by height");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("ERROR_BLOCKCH_BLOCK_GET_BY_HEIGHT.");
                            break;
                        default:
                            errorToReturn.setMessage("Unknown error.");
                            errorToReturn.setStatusCode(500);
                            errorToReturn.setError("UNKNOWN_ERROR.");
                    }
                    const response = h.response(errorToReturn);
                    response.code(errorToReturn.getStatusCode());
                    response.header('Content-Type', 'application/json; charset=utf-8');
                    return response;
                }
            },
            options: {
                validate: {
                    params: {
                        starblockheight: Joi.number().integer().min(0)
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
module.exports = (server, mempool, blockchain) => { return new StarRegistrationController(server, mempool, blockchain); }