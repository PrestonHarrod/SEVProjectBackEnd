module.exports = app => {
    const requests = require("../controllers/request.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", requests.create);
  
    // Retrieve all Request
    router.get("/", requests.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", requests.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", requests.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", requests.delete);
  
    // Delete all request
    router.delete("/", requests.deleteAll);
  
    app.use('/api/requests', router);
  };