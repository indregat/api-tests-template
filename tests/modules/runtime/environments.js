(function () {
  const domains = {
    api: null
  };
  let environments = {
    dev: {}
  };

  exports.getEnvironmentCfg = function () {
    return environments;
  };

  // constructs urls
  exports.loadAndSetConfig = function () {

    domains.api = process.env.API_URL_ROOT || 'https://api.monetha.io';// cia postman API, toks nieko nedarantis, issibandymui requestu. Kai savo testini, cia reikia pakeisti
                                               //https://api.monetha.io   https://postman-echo.com
    // construct the rest of url values
    let env = environments.dev;
    env.urlApi = domains.api;

    console.log(`env: ${env.urlApi}`);
  };
})();
