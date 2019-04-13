# Project #3. Connect Private Blockchain to Front-End Client via APIs

This is Project 3, Connect Private Blockchain to Front-End Client via APIs. In this project I created the classes to manage my private blockchain using REST API web services.

## Node.js framework

For this project, the Node.js framework used is hapijs v18.1.0 (https://hapijs.com/)

## Endpoint documentation

## Get a block by his height

### Request

`GET /block/{blockheight}`

	curl -i -H 'Accept: application/json' GET http://localhost:8000/block/0

### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	content-length: 163
	accept-ranges: bytes

	{
		"hash":"63c1a3c0f1a50f45ed72f16ad187a96ab8c7feca9e896b57867bbbc6d21d9e37",
		"height":0,
		"body":"This is my GenesisBlock.",
		"time":"1555175773",
		"previousblockhash":""
	}

## Get a block by his height

### Request

`POST /block`

	curl -i -H 'Accept: application/json' -d '{"body": "Test Data #Eudes"}' POST http://localhost:8000/block 

### Response

	HTTP/1.1 200 OK
	content-type: application/json; charset=utf-8
	cache-control: no-cache
	content-length: 239
	accept-ranges: bytes

	{
		"hash": "38053efff8bafe3658f004171ff7c7306dc33ec6dcb5df870ca1dcb786e69522",
		"height": 21,
		"body": "Test Data #Eudes",
		"time": "1555177934",
		"previousblockhash": "",
		"previousBlock": "5014b9bfbb1e4871bf2504fd1f9d9fe401f64d1741e975270e44fdb4dfc525bc"
	}

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Testing the project using Postman

1. Import the Postman collection `udacity-nd1309.collection.json` into Postman