/* ===== RequestValidationModel Class ==============================
|  Class with a constructor for RequestValidation 			   |
|  ===============================================*/

class RequestValidationModel {

	constructor(vAddress){
		// RequestValidationModel properties
		this.address = vAddress;
	}

	getAddress() {
		return this.address;
	}
}

module.exports.RequestValidationModel = RequestValidationModel;