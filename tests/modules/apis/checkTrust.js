let utils = require('../runtime/utils');
let settings = require('../runtime/settings');
let chai = require('chai'), chaiHttp = require('chai-http');
let expect = settings.expect;
chai.use(chaiHttp);


(function () {                                      //pati faila reiktu persivadinti,i pvz deals.js
  let env = settings.environment;
  let data = settings.runtimeData;

  /**
  * get user by number request.
  */
 exports.get = async function (code, phone) { //cia ne .getRequest, o tiesiog get
    
    return await chai.request(env.urlApi)
      .get(`/mth/v1/users/phone/${code}/${phone}`) //vietoje /get nusirodom savo get`a, pvz : /mth/v1/users/deals. Query parametras paciame teste pasiduoda
      .set('content-type', 'application/json')
      .set('Authorization', data.global.Authorization)
      .send();
  };

  

})();
