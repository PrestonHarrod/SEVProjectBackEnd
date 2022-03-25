module.exports = app => {
    const sms = require("../controllers/sms.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sms.findAll);
  
    app.use('/api/sms', router);
  };