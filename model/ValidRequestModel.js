/* ===== ValidRequestModel Class ==============================
|  Class with a constructor for ValidRequestModel 			   |
|  ===============================================*/

const BaseModel = require('./BaseModel').BaseModel;

class ValidRequestModel {

	constructor(vRegisterStar, data){
		// ValidRequestModel properties
		this.registerStar = vRegisterStar;
		this.status = data;
	}
	
}

module.exports.ValidRequestModel = ValidRequestModel;