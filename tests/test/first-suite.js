require('mocha');
let settings = require('../modules/runtime/settings');     //VISAS MOCHA WORKFRAME SNIPPETAS PADARYTAS SU POSTMAN API, SAVO RASANT, REIKIA VISKA PASIKEISTI
let env = require('../modules/runtime/environments');
let pm = require('../modules/apis/postman');     //kai postman.js pervadinam i deals.js cia reikia pakeisti i /apis/deals. Automatiskai ismeta lentele
                                                 //let pm keiciam i deals, ir visur, kur pm metodas keiciam i deal, isskyrus data.pm 
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('INTEGRATION API TESTS', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  after("Data cleanup.", function () { // dabar tuscia, bet kartais po testu reikia issitrinti sukurtus duomenis
  });

  describe('Test suite one', function () {

    it('Should be able to call get request', async function () { // cia pavadinima pasikeisti, i: should be able to get requests
      // Given
      const query = '?foo1=bar1&foo2=bar2';//cia kaip postmane pre-request script, pvz Monetha: ?deal_type=active&is_trashed=false&offset=0&limit=50
      // When
      let response = await pm.getRequest(query);//pats requestas. Vietoje pm rasom deals. Vietoje .getRequest tiesiog get, nes postman.js pakeitem
    
      // Then
      expect(response.statusCode).to.equal(200);//cia jau pats testas
      //cia imam is body, tik atkreipti demesy, jei yra duomenu masyvas.
      expect(response.body).to.have.property('args'); //args keiciam, pvz, i condition: expect(response.body[0]).to.have.property('condition');
      expect(response.body.args.foo1).to.equal('bar1'); //expect(response.body[0].state).to.equal('CANCELLED'); cia is dealo info paimta, kad state yra cancelled
    });
/*
    it('Should not be able to get deals when deal_type is missing', async function () { 
      // Given
      const query = '?&is_trashed=false&offset=0&limit=50';
      // When
      let response = await deals.getRequest(query);
       // Then

       kad zinoti, kas grizta:
       console.log("CIA YRA RESPONSE: "+ JSON.stringify(response.body));   JSON.stringify pakeicia object i normalu stringa

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code'); 
      expect(response.body.code).to.equal('VALIDATION_ERROR'); 
       expect(response.body.message).to.equal('(602) deal_type in query is required)'); 
    });
*/
    it('Should be able to call post request', async function () {
      // Given
      data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
      // When
      let response = await pm.postRequest(); //pm i deals
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
      expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    });

    it('Should be able to call put request', async function () {
      // Given
      data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
      // When
      let response = await pm.putRequest(); //pm i deals
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
      expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    });

    it('Should be able to call patch request', async function () {
      // Given
      data.pm.first_name = utils.randomString(1, 'QWERTYUIOPLKJHGFDSAZXCVBNM') + utils.randomString(14, 'qwertyuioplkjhgfdsazxcvbnm');
      // When
      let response = await pm.patchRequest();//pm i deals
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data.date_stamp).to.equal(utils.getDateStamp());
      expect(JSON.stringify(response.body)).to.contain(data.pm.first_name);
    });

    it('Should be able to call delete request', async function () {
      // Given
      data.pm.id = utils.randomString(5, '123456789');
      // When
      let response = await pm.deleteRequest(); //pm i deals
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.not.have.property('first_name');
      expect(JSON.stringify(response.body)).to.not.contain(data.pm.first_name);
    });

  });
  
});
