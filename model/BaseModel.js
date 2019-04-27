/* ===== BaseModel Class ==============================
|  Class with a constructor for BaseModel 			   |
|  ===============================================*/

class BaseModel {

	constructor(vRequestTimeStamp, vMessage, vValidationWindow){
		// BaseModel properties
		this.requestTimeStamp = vRequestTimeStamp;
		this.message = vMessage;
		this.validationWindow = vValidationWindow;
	}
	
}

module.exports.BaseModel = BaseModel;