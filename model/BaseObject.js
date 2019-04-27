/* ===== BaseObject Class ==============================
|  Class with a constructor for BaseObject 			   |
|  ===============================================*/

class BaseObject {

	constructor(vRequestTimeStamp, vMessage, vValidationWindow){
		// BaseObject properties
		this.requestTimeStamp = vRequestTimeStamp;
		this.message = vMessage;
		this.validationWindow = vValidationWindow;
	}
	
}