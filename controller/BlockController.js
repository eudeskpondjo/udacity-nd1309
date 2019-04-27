const Joi = require('joi');
const BlockClass = require('../model/Block.js');
const BlockChain = require('../BlockChain.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.myBlockChain = new BlockChain.Blockchain();
        this.initializeData();
        this.getBlockByHeight();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by height, url: "block/:blockheight"
     */
    getBlockByHeight() {
        this.server.route({
            method: 'GET',
            path: '/block/{blockheight}',
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
     * Implement a POST Endpoint to add a new Block, url: "/block"
     */
    postNewBlock() {
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
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeData() {
        let self = this;
        setTimeout(function () {
            (async () => {
                for (let index = 1; index <= 10; index++) {
                    let blockTest = new BlockClass.Block(`Test Block - #${index}`);
                    await self.myBlockChain.addBlock(blockTest);
                }
            })();
        }, 1000);
    }
}

/**
 * Exporting the BlockController class
 * @param {*} server 
 */
module.exports = (server) => { return new BlockController(server); }