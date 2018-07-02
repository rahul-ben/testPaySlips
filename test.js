//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('./settings/config')

chai.should();

chai.use(chaiHttp);

describe('server running check', () => {
    const paySlipInput = {
        "superRate":  9,
        "annualSalary": 10050,
        "firstName": "Andrew" ,
        "lastName": "Smith",
        "paymentStartDate": "01 March – 31 March"
    };

    it('server should be running, Please hit `npm start`', (done) => {
        chai.request(config.web_server.url)
        .get('/')
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);

            done();
        });
    });

    it('POST paySlips route with annualSalary between $0 and $18200', (done) => {
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('grossIncome').eql('838');
            res.body.data.should.have.property('incomeTax').eql('0');
            res.body.data.should.have.property('netIncome').eql('838');
            res.body.data.should.have.property('superAmount').eql('75');;
            res.body.data.should.have.property('paymentStartDate').eql('01 March – 31 March');;

            done();
        });
    });

    it('POST paySlips route with annualSalary between $18201 and $37000', (done) => {
        paySlipInput.annualSalary = 30050;

        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('grossIncome').eql('2504');
            res.body.data.should.have.property('incomeTax').eql('188');
            res.body.data.should.have.property('netIncome').eql('2317');
            res.body.data.should.have.property('superAmount').eql('225');;
            res.body.data.should.have.property('paymentStartDate').eql('01 March – 31 March');;
            
            done();
        });
    });


    it('POST paySlips route with annualSalary between $37001 and $87000', (done) => {
        paySlipInput.annualSalary = 60050;

        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('grossIncome').eql('5004');
            res.body.data.should.have.property('incomeTax').eql('922');
            res.body.data.should.have.property('netIncome').eql('4082');
            res.body.data.should.have.property('superAmount').eql('450');;
            res.body.data.should.have.property('paymentStartDate').eql('01 March – 31 March');;
            
            done();
        });
    });

    it('POST paySlips route with annualSalary between  $87001 and $180000', (done) => {
        paySlipInput.annualSalary = 130050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('grossIncome').eql('10838');
            res.body.data.should.have.property('incomeTax').eql('2979');
            res.body.data.should.have.property('netIncome').eql('7858');
            res.body.data.should.have.property('superAmount').eql('975');;
            res.body.data.should.have.property('paymentStartDate').eql('01 March – 31 March');;
            
            done();
        });
    });

    it('POST paySlips route with annualSalary greater than  $180001', (done) => {
        paySlipInput.annualSalary = 200050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('grossIncome').eql('16671');
            res.body.data.should.have.property('incomeTax').eql('5271');
            res.body.data.should.have.property('netIncome').eql('11400');
            res.body.data.should.have.property('superAmount').eql('1500');;
            res.body.data.should.have.property('paymentStartDate').eql('01 March – 31 March');;
            
            done();
        });
    });

    it('it should not POST a pay slip without annual salary', (done) => {
        paySlipInput.annualSalary = null;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });

    it('it should not POST a pay slip without firstname', (done) => {
        paySlipInput.annualSalary = 60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });
       
    it('it should not POST a pay slip without lastName', (done) => {
        paySlipInput.annualSalary = 60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });

    it('it should not POST a pay slip without paymentStartDate', (done) => {
        paySlipInput.annualSalary = 60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });

    it('it should not POST a pay slip without superRate', (done) => {
        paySlipInput.annualSalary = 60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });

    it('it should not POST a pay slip with negative annualSalary', (done) => {
        paySlipInput.annualSalary = -60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };
            
            done();
        });
    });

    it('it should not POST a pay slip with zero annualSalary', (done) => {
        paySlipInput.annualSalary = 0;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);
            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };

            done();
        });
    });

    it('it should not POST a pay slip with negative superRate', (done) => {
        paySlipInput.superRate = -9;
        paySlipInput.annualSalary = 60050;
        
        chai.request(config.web_server.url)
        .post('/api/paySlip')
        .send(paySlipInput)
        .end((err, res) => {
            if(err) return done(err);

            if(res.status == 400) { 
                res.should.have.status(400);
                res.body.should.be.a('object');
                return done()
            };

            done();
        });
    });
});
