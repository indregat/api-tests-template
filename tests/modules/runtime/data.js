let utils = require('./utils');

(function () {
  // define global data and default values - subject to change during runtime
  let data = {
    global: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg0Mjc2MjcsImlhdCI6MTU4NTgzNTYyNywibmJmIjoxNTg1ODM1NjI3LCJpZCI6NjYyNywiY2lkIjo2NjQ5MiwiZGV2X2lkIjoic3RyaW5nIn0.sFSKo703XaA5mDJBZzY9G3obwmc3LFaSE-j8IouMzVg' //cia nusirodom autorizacija, pvz Monetha: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg0Mjc2MjcsImlhdCI6MTU4NTgzNTYyNywibmJmIjoxNTg1ODM1NjI3LCJpZCI6NjYyNywiY2lkIjo2NjQ5MiwiZGV2X2lkIjoic3RyaW5nIn0.sFSKo703XaA5mDJBZzY9G3obwmc3LFaSE-j8IouMzVg
    },
    user: {
      address: "address",
          country_code_iso: "LT",
          email: "indre.gatulyte@gmail.com",
          first_name: "Indre",
          last_name: "Pus",
          device_id: "1234"
    }
  };
  exports.getDefaultEmptyValue = function () {
    return null;
  };
  exports.getAll = function () {
    return data;
  };
})();
