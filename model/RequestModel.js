/* ===== RequestModel Class ==============================
|  Class with a constructor for RequestModel 			   |
|  ===============================================*/

class RequestModel {

	constructor(vWalletAddress, vRequestTimeStamp){
		// RequestModel properties
		this.requestTimeStamp = vRequestTimeStamp;
		this.validationWindow = 300;
		this.walletAddress = vWalletAddress;
		this.message = vWalletAddress.concat(":").concat(vRequestTimeStamp).concat(":").concat("starRegistry");
	}

	getWalletAddress() {
		return this.walletAddress;
	}

	getRequestTimeStamp() {
		return this.requestTimeStamp;
	}

	getValidationWindow() {
		return this.validationWindow;
	}

	getMessage() {
		return this.message;
	}

	setValidationWindow(vWindow) {
		this.validationWindow = vWindow;
	}

}

module.exports.RequestModel = RequestModel;