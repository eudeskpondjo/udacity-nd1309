/* ===== ValidRequestObject Class ==============================
|  Class with a constructor for ValidRequestObject 			   |
|  ===============================================*/

class ValidRequestObject {

	constructor(vRegisterStar, data){
		// ValidRequestObject properties
		this.registerStar = vRegisterStar;
		this.status = data;
	}
	
}

module.exports.ValidRequestObject = ValidRequestObject;