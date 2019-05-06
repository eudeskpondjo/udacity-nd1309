const Joi = require('joi');
const RequestValidationModel = require('../model/RequestValidationModel').RequestValidationModel;
const MessageSignatureModel = require('../model/MessageSignatureModel').MessageSignatureModel;
const BlockchainError = require('../model/BlockchainError').BlockchainError;

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockchainIdValidationController {

    /**
     * Constructor to create a new BlockchainIdValidationController with initialization of all our endpoints
     * @param {*} server 
     */
    constructor(server, mempool) {
        this.server = server;
        this.myMempool = mempool;
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
                    let errorToReturn = new BlockchainError();
                    switch (err.message) {
                        case "SIGNATURE_NOT_VALID.":
                            errorToReturn.setMessage("The signature provided is not valid.");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("SIGNATURE_NOT_VALID.");
                            break;
                        case "TIME_WINDOW_EXPIRED.":
                            errorToReturn.setMessage("This request is not longer valid. The time windows has expired.");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("TIME_WINDOW_EXPIRED.");
                            break;
                        case "REQUEST_NOT_IN_MEMPOOL":
                            errorToReturn.setMessage("There is no request related to the address specified.");
                            errorToReturn.setStatusCode(400);
                            errorToReturn.setError("REQUEST_NOT_IN_MEMPOOL.");
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
module.exports = (server, mempool) => { return new BlockchainIdValidationController(server, mempool); }