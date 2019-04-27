const Joi = require('joi');
const RequestValidationModel = require('../model/RequestValidationModel').RequestValidationModel;
const MessageSignatureModel = require('../model/MessageSignatureModel').MessageSignatureModel;
const Mempool = require('../Mempool.js').Mempool;

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
        this.myMempool = new Mempool();
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
                    let requestValidationObject = new RequestValidationModel(request.payload.address);
                    const result = await this.myMempool.addARequestValidation(requestValidationObject);
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
                        address: Joi.string().required()
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
                    let messageSignatureObject = new MessageSignatureModel(request.payload.address, request.payload.signature);
                    const result = await this.myMempool.validateRequestByWallet(messageSignatureObject);
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
                        address: Joi.string().required(),
                        signature: Joi.string().required()
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