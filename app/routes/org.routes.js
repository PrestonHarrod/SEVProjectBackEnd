module.exports = app => {
    const orgs = require("../controllers/org.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", orgs.create);
  
    // Retrieve all types
    router.get("/", orgs.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", orgs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", orgs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", orgs.delete);
  
    // Delete all roles
    router.delete("/", orgs.deleteAll);
  
    app.use('/api/orgs', router);
  };