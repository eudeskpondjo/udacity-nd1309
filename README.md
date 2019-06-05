# Project #4. Build a Private Blockchain Notary Service

This is Project 3, Connect Private Blockchain to Front-End Client via APIs. In this project I created the classes to manage my private blockchain using REST API web services.

## Node.js framework

For this project, the Node.js framework used is hapijs v18.1.0 (https://hapijs.com/)

## Endpoint documentation

### POST address to validate request with JSON response.

#### Request

`POST /requestValidation`

	curl -i -H 'Accept: application/json' -d {"address":"1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex"} POST http://localhost:8000/requestValidation

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	{
		"requestTimeStamp": "1557184978",
		"validationWindow": 300,
		"walletAddress": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
		"message": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex:1557184978:starRegistry"
	}

### POST address and signature to validates message signature with JSON response.

#### Request

`POST /message-signature/validate`

	curl -i -H 'Accept: application/json' -d '{"address":"1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex", "signature":"IICEH75f...."}' POST http://localhost:8000/message-signature/validate 

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	{
		"registerStar": true,
		"status": {
			"requestTimeStamp": "1557185944",
			"message": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex:1557185944:starRegistry",
			"validationWindow": 268,
			"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
			"messageSignature": true
		}
	}

### POST Star information to be saved in the Blockchain with JSON response.

#### Request

`POST /block`

	curl -i -H 'Accept: application/json' \
	-d \
		{\
			"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",\
			"star": {\
				"dec": "68° 34' 56.9",\
				"ra": "16h 19m 1.0s",\
				"story": "J'espere que c'est trest je suis content."\
			}\
		}\
	POST http://localhost:8000/block

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	{
		"hash": "fc9b1a4a92b06d9154c57bad43675c487f7ff77df959d17d22cfe2e958378b0a",
		"height": 9,
		"body": {
			"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
			"star": {
				"dec": "68° 34' 56.9",
				"ra": "16h 19m 1.0s",
				"story": "4a2765737065726520717565206327657374207472657374206a65207375697320636f6e74656e742e",
				"storyDecoded": "J'espere que c'est trest je suis content."
			}
		},
		"time": "1557186062",
		"previousblockhash": "9811e8e77fb143d6aad3755763f9c3d6223b772a6311c027e6a414b5ececc867"
	}

### GET Star by hash with JSON response.

#### Request

`GET /stars/hash:[HASH]`

	curl -i -H 'Accept: application/json' GET http://localhost:8000/stars/hash:9811e8e77fb143d6aad3755763f9c3d6223b772a6311c027e6a414b5ececc867

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	[
		{
			"hash": "9811e8e77fb143d6aad3755763f9c3d6223b772a6311c027e6a414b5ececc867",
			"height": 8,
			"body": {
				"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
				"star": {
					"dec": "68° 34' 56.9",
					"ra": "16h 19m 1.0s",
					"story": "4a27657370657265207175652063276573742074726573206269656e206574206a65207375697320636f6e74656e742e",
					"storyDecoded": "J'espere que c'est tres bien et je suis content."
				}
			},
			"time": "1557185037",
			"previousblockhash": "7a81b4b130db5a3c3a868ebd314bd181dabba172790f68667ad2a3831ca5f8d1"
		}
	]

### GET Star by address with JSON response.

#### Request

`GET /stars/address:[ADDRESS]`

	curl -i -H 'Accept: application/json' GET http://localhost:8000/stars/address:1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	[
		{
			"hash": "7a81b4b130db5a3c3a868ebd314bd181dabba172790f68667ad2a3831ca5f8d1",
			"height": 7,
			"body": {
				"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
				"star": {
					"dec": "68° 34' 56.9",
					"ra": "16h 19m 1.0s",
					"story": "4a27657370657265207175652063276573742074726573206269656e206574206a65207375697320636f6e74656e742e",
					"storyDecoded": "J'espere que c'est tres bien et je suis content."
				}
			},
			"time": "1557184688",
			"previousblockhash": "2afaec2065cd6963739f1845b1e728f12e7363ea01cf93f5b83fc7bbc693b56b"
		},
		{
			"hash": "9811e8e77fb143d6aad3755763f9c3d6223b772a6311c027e6a414b5ececc867",
			"height": 8,
			"body": {
				"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
				"star": {
					"dec": "68° 34' 56.9",
					"ra": "16h 19m 1.0s",
					"story": "4a27657370657265207175652063276573742074726573206269656e206574206a65207375697320636f6e74656e742e",
					"storyDecoded": "J'espere que c'est tres bien et je suis content."
				}
			},
			"time": "1557185037",
			"previousblockhash": "7a81b4b130db5a3c3a868ebd314bd181dabba172790f68667ad2a3831ca5f8d1"
		},
		{
			"hash": "fc9b1a4a92b06d9154c57bad43675c487f7ff77df959d17d22cfe2e958378b0a",
			"height": 9,
			"body": {
				"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
				"star": {
					"dec": "68° 34' 56.9",
					"ra": "16h 19m 1.0s",
					"story": "4a2765737065726520717565206327657374207472657374206a65207375697320636f6e74656e742e",
					"storyDecoded": "J'espere que c'est trest je suis content."
				}
			},
			"time": "1557186062",
			"previousblockhash": "9811e8e77fb143d6aad3755763f9c3d6223b772a6311c027e6a414b5ececc867"
		}
	]

### GET block by height with JSON response.

#### Request

`GET block/[HEIGHT]`

	curl -i -H 'Accept: application/json' GET http://localhost:8000/block/7

#### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	accept-ranges: bytes

	{
		"hash": "7a81b4b130db5a3c3a868ebd314bd181dabba172790f68667ad2a3831ca5f8d1",
		"height": 7,
		"body": {
			"address": "1BtAwxYTSBQR8tj4ddAbEap1qqDLyvTgex",
			"star": {
				"dec": "68° 34' 56.9",
				"ra": "16h 19m 1.0s",
				"story": "4a27657370657265207175652063276573742074726573206269656e206574206a65207375697320636f6e74656e742e",
				"storyDecoded": "J'espere que c'est tres bien et je suis content."
			}
		},
		"time": "1557184688",
		"previousblockhash": "2afaec2065cd6963739f1845b1e728f12e7363ea01cf93f5b83fc7bbc693b56b"
	}


## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Testing the project using Postman 

1. Import the Postman collection `udacity-nd1309.collection.json` into Postman