/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class BlockchainError {
	constructor() {
		// Add your BlockchainError properties
		this.statusCode = "400";
		this.error = 200;
		this.message = "";
	}

	getStatusCode() {
		return this.statusCode;
	}

	setStatusCode(vStatusCode) {
		this.statusCode = vStatusCode;
	}

	setError(vError) {
		this.error = vError;
	}

	setMessage(vMessage) {
		this.message = vMessage;
	}
}

module.exports.BlockchainError = BlockchainError;