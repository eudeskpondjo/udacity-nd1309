/* ===== Mempool Class ===============================
|  Class with a constructor for Mempool management   |
|  =================================================*/

const RequestModel = require('./model/RequestModel').RequestModel;
const ValidRequestModel = require('./model/ValidRequestModel').ValidRequestModel;
const StatusModel = require('./model/StatusModel').StatusModel;

class Mempool {

    constructor() {
        this.mempool = [];
        this.timeoutRequests = [];
    }

    addARequestValidation(requestValidationObject) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let requestObject = new RequestModel(requestValidationObject.getAddress(), "time", "message", "validation");
            resolve(requestObject);
        });
    }

    validateRequestByWallet(messageSignatureObject) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let statusObject = new StatusModel(messageSignatureObject.getAddress(), "time", "message", "validation", messageSignatureObject.getSignature());
            let validRequestObject = new ValidRequestModel("true", statusObject);
            resolve(validRequestObject);
        });    
    }

    verifyAddressRequest() {
        let self = this;
    }

    removeValidationRequest() {

    }

    setTimeOut() {

    }

    verifyTimeLeft() {
        
    }
    
    verifyMessage() {
        
    } 
        
    removeTimeOut() {
        
    }
   
}

module.exports.Mempool = Mempool;