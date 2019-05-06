/* ===== Star Class ==============================
|  Class with a constructor for star 			   |
|  ===============================================*/

class Star {

	constructor(vDec, vRa, vMag, vCen, vStory){
		// Star properties
		this.dec = vDec;
		this.ra = vRa;
		this.mag = vMag,
        this.cen = vCen,
		this.story = vStory;
	}
	
	getDec() {
		return this.dec;
	}

	getRa() {
		return this.ra;
	}

	getStory() {
		return this.story;
	}
}

module.exports.Star = Star;