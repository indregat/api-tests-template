require('mocha');
let settings = require('../modules/runtime/settings');   
let env = require('../modules/runtime/environments');
let deals = require('../modules/apis/deals_user');     
let utils = require('../modules/runtime/utils');
let chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('DEALS', function () {
  let data = settings.runtimeData;
  let options = settings.options;
  let expect = settings.expect;
  this.timeout(options.apiCallTimeout);

  before('Use config from server', function () {
    settings.setEnvironment('dev');
    return env.loadAndSetConfig();
  });

  after("Data cleanup.", function () { 
  });

  describe('Deals Test Suite', function () {

    it('Should be able to get request', async function () { 
      // Given
      const query = '?deal_type=active&is_trashed=false&offset=0&limit=50';
      // When
      let response = await deals.get(query);
      // Then
      expect(response.statusCode).to.equal(200);
      expect(response.body[0]).to.have.property('condition'); 
      expect(response.body[0].state).to.equal('ACCEPTABLE_BY_BUYER'); 
    });

    it('Should not be able to get deals when deal_type is missing', async function () {
      // Given
      const query = '?&is_trashed=false&offset=0&limit=50';
      // When
      let response = await deals.get(query);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(602) deal_type in query is required');
    });

    it('Should not be able to get deals when deal_type is invalid', async function () {
      // Given
      let dealType = 'INVALID';
      const query = `?deal_type=${dealType}&is_trashed=false&offset=0&limit=50`;
      // When
      let response = await deals.get(query);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(606) deal_type in query should be one of [active signed]');
    });

    it('Should not be able to get deals when limit is invalid', async function () {
      // Given
      let limit = 'INVALID';
      const query = `?deal_type=active&is_trashed=false&offset=0&limit=${limit}`;
      // When
      let response = await deals.get(query);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(601) limit in query must be of type int64: \"INVALID\"');
    });

    it('Should not be able to get deals when offset is invalid', async function () {
      // Given
      let offset = 'INVALID';
      const query = `?deal_type=active&is_trashed=false&offset=${offset}&limit=50`;
      // When
      let response = await deals.get(query);
      // Then
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('VALIDATION_ERROR');
      expect(response.body.message).to.equal('(601) offset in query must be of type int64: \"INVALID\"');
    });

    it('Should not be able to get deals when Authorization is invalid', async function () {
      // Given
      let Authorization = data.global.Authorization;

      data.global.Authorization = 'dfasfasfsaf';
      const query = `?deal_type=active&is_trashed=false&offset=0&limit=50`;
      // When
      let response = await deals.get(query);
      // Then

      expect(response.statusCode).to.equal(403);
      expect(response.body).to.have.property('code');
      expect(response.body.code).to.equal('ACCESS_DENIED');
      expect(response.body.message).to.equal('Access to this API has been disallowed');

      data.global.Authorization = Authorization;
    });


  });

});














