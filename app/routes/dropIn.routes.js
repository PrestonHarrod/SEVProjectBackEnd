module.exports = app => {
    const dropIns = require("../controllers/dropIn.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", dropIns.create);
  
    // Retrieve all user
    router.get("/", dropIns.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", dropIns.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", dropIns.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", dropIns.delete);
  
    // Delete all subject
    router.delete("/", dropIns.deleteAll);
  
    app.use('/api/dropIns', router);
  };