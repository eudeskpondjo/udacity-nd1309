/* ===== StatusModel Class ==============================
|  Class with a constructor for StatusModel 			   |
|  ===============================================*/

class StarRequestModel {

	constructor(vAddress, vStar){
		// StarRequestModel properties
		this.address = vAddress;
		this.star = vStar;
	}
	
	getAddress() {
		return this.address;
	}

	getStar() {
		return this.star;
	}	
}

module.exports.StarRequestModel = StarRequestModel;