/* ===== RequestModel Class ==============================
|  Class with a constructor for RequestModel 			   |
|  ===============================================*/

const BaseModel = require('./BaseModel').BaseModel;

class RequestModel extends BaseModel {

	constructor(vWalletAddress, vRequestTimeStamp, vMessage, vValidationWindow){
		// RequestModel properties
		super(vRequestTimeStamp, vMessage, vValidationWindow)
		this.walletAddress = vWalletAddress;
	}

}

module.exports.RequestModel = RequestModel;