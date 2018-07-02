# Test Task

It was nodejs test task to create payslips according to input data and create a well standard structure of code.Mocha has been used for test cases

  - PaySlip creation
  - Test cases
  - Well standard nodejs structure

### Tech

This app uses following tech. to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework


### Installation

This requires [Node.js](https://nodejs.org/) any stable version +6 to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install 
$ npm start
```

### Development

This app is running on expressJS and uses mocha for for test cases.

Open your favorite Terminal and run these commands.

For running server:
```sh
$ npm start
```
For verifying running server:
```
Verify the deployment by navigating to your server address in your preferred browser.

127.0.0.1:3000
```

For running tests:
```sh
$ npm test
```

To test pay slips

*Request URL*

```
http://localhost:3000/api/paySlip
```

*Method*
```
POST
```

*Headers Object*

```{"Content-Type" :"application/json"}```

*Request Body*
```
{
	"superRate":  9,
	"annualSalary": 60050,
	"firstName": "Andrew" ,
	"lastName": "Smith",
	"paymentStartDate": "01 March – 31 March"
}
```
*Expected response*
```
{
    "is_success": true,
    "data": {
        "grossIncome": "5004",
        "incomeTax": "922",
        "netIncome": "4082",
        "superAmount": "450",
        "paymentStartDate": "01 March – 31 March"
    }
}
```




### Note about the test doc

*Record of income tax of Claire Wong in test document is wrong, income tax should be 2669 instead of 2696*



