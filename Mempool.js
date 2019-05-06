/* ===== Mempool Class ===============================
|  Class with a constructor for Mempool management   |
|  =================================================*/

const RequestModel = require('./model/RequestModel').RequestModel;
const ValidRequestModel = require('./model/ValidRequestModel').ValidRequestModel;
const StatusModel = require('./model/StatusModel').StatusModel;
const bitcoinMessage = require('bitcoinjs-message');
const TimeoutRequestsWindowTime = 5 * 60 * 1000;

class Mempool {

    constructor() {
        this.mempool = new Map();
        this.mempoolValid = new Map();
        this.timeoutRequests = [];
    }

    addARequestValidation(requestValidationObject) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let address = requestValidationObject.getAddress();
            // Check if the address is already stored in the mempool
            let storedRequestObject = self.mempool.get(address);

            if (typeof storedRequestObject === 'undefined') {
                // the adress is not in the mempool so we to store
                // 1- Create an object request
                let requestObject = new RequestModel(requestValidationObject.getAddress(), new Date().getTime().toString().slice(0, -3));
                // 1- the address in the mempool
                self.mempool.set(address, requestObject);
                // 2- the requesttimestamp in timeoutRequests
                self.timeoutRequests[address] = setTimeout(function () { self.removeValidationRequest(address) }, TimeoutRequestsWindowTime);
                resolve(requestObject);
            } else {
                // the adresse is in the mempool
                let timeElapse = (new Date().getTime().toString().slice(0, -3)) - storedRequestObject.getRequestTimeStamp();
                let timeLeft = (TimeoutRequestsWindowTime / 1000) - timeElapse;
                storedRequestObject.setValidationWindow(timeLeft);
                resolve(storedRequestObject);
            }
        });
    }

    validateRequestByWallet(messageSignatureObject) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let storedRequestObject = self.mempool.get(messageSignatureObject.getAddress());
            if (typeof storedRequestObject !== 'undefined') {
                let timeElapse = (new Date().getTime().toString().slice(0, -3)) - storedRequestObject.getRequestTimeStamp();
                let timeLeft = (TimeoutRequestsWindowTime / 1000) - timeElapse;
                storedRequestObject.setValidationWindow(timeLeft);
                if (timeLeft > 0) {
                    let statusObject = new StatusModel(storedRequestObject, messageSignatureObject.getSignature());
                    let isValid = bitcoinMessage.verify(storedRequestObject.message, storedRequestObject.walletAddress, messageSignatureObject.signature);
                    if (isValid) {
                        statusObject.messageSignature = isValid;
                        let validRequestObject = new ValidRequestModel(isValid, statusObject);
                        self.mempoolValid.set(statusObject.getAddress(), validRequestObject);
                        self.timeoutRequests.splice(self.timeoutRequests.indexOf(statusObject.getAddress()), 1);
                        self.mempool.delete(statusObject.getAddress());
                        resolve(validRequestObject);
                    } else {
                        reject(new Error("SIGNATURE_NOT_VALID."));
                    }
                } else {
                    reject(new Error("TIME_WINDOW_EXPIRED."));
                }
            } else {
                reject(new Error("REQUEST_NOT_IN_MEMPOOL"));
            }
        });
    }

    verifyAddressRequest(startRequestObject) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Check if the address is already stored in the mempool
            let validRequestObject = self.mempoolValid.get(startRequestObject.address);
            if (typeof validRequestObject !== 'undefined') {
                resolve(validRequestObject.status.messageSignature);
            } else {
                reject(new Error("REQUEST_VALIDATION_NOT_EXIST"));
            }
        });
    }

    removeValidationRequest(wAddress) {
        this.mempool.delete(wAddress);
    }

}

module.exports.Mempool = Mempool;