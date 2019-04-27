/* ===== StatusModel Class ==============================
|  Class with a constructor for StatusModel 			   |
|  ===============================================*/

const BaseModel = require('./BaseModel').BaseModel;

class StatusModel extends BaseModel {

	constructor(vAddress, vRequestTimeStamp, vMessage, vValidationWindow, vMessageSignature){
		// StatusModel properties
		super(vRequestTimeStamp, vMessage, vValidationWindow)
		this.address = vAddress;
		this.messageSignature = vMessageSignature;
	}
	
}

module.exports.StatusModel = StatusModel;