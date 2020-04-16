require('mocha');
let chai = require('chai'), chaiHttp = require('chai-http');
let settings = require('../modules/runtime/settings');
chai.use(chaiHttp);
describe('Test Group', function () {
  let expect = settings.expect;
  before('Before', function () {
    console.log("Ivyksta pries testa");
  });
  after("After", function () {
    console.log("Ivyksta po testa");
  });
  describe('Test suite', function () {
    it('2+2 yra 4', async function () {
      let atsakymas = 2 + 2;
      console.log("Vyksta testas");
      // Given
      // When
      // Then
      expect(atsakymas).to.equal(4);

    });

    it('"1000" + 10 lygu "100010"', async function () {
      let atsakymas = "1000" + 10;
      expect(atsakymas).to.equal("100010");
    });
    it('"100010" - 10 lygu "1000"', async function () {
      let atsakymas = "100010" - 10;
      expect(atsakymas).to.equal(100000);
    });
    it('17*35 lygu 595', async function () {
      let atsakymas = 17 * 35;
      expect(atsakymas).to.equal(595);
    });
    it('1000/2 lygu 500', async function () {
      let atsakymas = 1000 / 2;
      expect(atsakymas).to.equal(500);
    });
    it('10 + "1" lygu "101"', async function () {
      let atsakymas = 10 + "1";
      expect(atsakymas).to.equal("101");
    });
  });
});