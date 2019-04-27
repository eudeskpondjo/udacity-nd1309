/* ===== MessageSignatureModel Class ==============================
|  Class with a constructor for MessageSignatureModel 			   |
|  ===============================================*/

const RequestValidationModel = require('./RequestValidationModel').RequestValidationModel;

class MessageSignatureModel extends RequestValidationModel {

	constructor(vAddress, vSignature){
		// MessageSignatureModel properties
		super(vAddress)
		this.signature = vSignature;
	}

	getSignature() {
		return this.signature;
	}
}

module.exports.MessageSignatureModel = MessageSignatureModel;