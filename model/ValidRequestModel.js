/* ===== ValidRequestModel Class ==============================
|  Class with a constructor for ValidRequestModel 			   |
|  ===============================================*/

class ValidRequestModel {

	constructor(vRegisterStar, data){
		// ValidRequestModel properties
		this.registerStar = vRegisterStar;
		this.status = data;
	}

	getRegisterStar() {
		return this.registerStar;
	}
	
	getStatus() {
		return this.status;
	}
}

module.exports.ValidRequestModel = ValidRequestModel;