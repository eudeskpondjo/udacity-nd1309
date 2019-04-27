/* ===== StatusObject Class ==============================
|  Class with a constructor for StatusObject 			   |
|  ===============================================*/

class StatusObject extends BaseObject {

	constructor(vAddress, vRequestTimeStamp, vMessage, vValidationWindow, vMessageSignature){
		// StatusObject properties
		super(vRequestTimeStamp, vMessage, vValidationWindow)
		this.address = vAddress;
		this.messageSignature = vMessageSignature;
	}
	
}

module.exports.StatusObject = StatusObject;