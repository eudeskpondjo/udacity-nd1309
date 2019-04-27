/* ===== RequestObject Class ==============================
|  Class with a constructor for RequestObject 			   |
|  ===============================================*/

class RequestObject extends BaseObject {

	constructor(vWalletAddress, vRequestTimeStamp, vMessage, vValidationWindow){
		// RequestObject properties
		super(vRequestTimeStamp, vMessage, vValidationWindow)
		this.walletAddress = vWalletAddress;
	}

}

module.exports.RequestObject = RequestObject;