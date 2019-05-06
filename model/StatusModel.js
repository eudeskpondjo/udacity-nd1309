/* ===== StatusModel Class ==============================
|  Class with a constructor for StatusModel 			|
|  ===============================================*/

class StatusModel {

	constructor(storedRequestObject, vMessageSignature){
		// StatusModel properties
		this.requestTimeStamp = storedRequestObject.requestTimeStamp;
		this.message = storedRequestObject.message;
		this.validationWindow = storedRequestObject.validationWindow;
		this.address = storedRequestObject.walletAddress;
		this.messageSignature = vMessageSignature;
	}

	getAddress() {
		return this.address;
	}

	getMessageSignature() {
		return this.messageSignature;
	}	

}

module.exports.StatusModel = StatusModel;