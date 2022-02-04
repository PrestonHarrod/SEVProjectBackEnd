module.exports = app => {
    const loginTokens = require("../controllers/loginToken.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", loginTokens.create);
  
    // Retrieve all types
    router.get("/", loginTokens.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", loginTokens.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", loginTokens.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", loginTokens.delete);
  
    // Delete all roles
    router.delete("/", loginTokens.deleteAll);
  
    app.use('/api/loginTokens', router);
  };