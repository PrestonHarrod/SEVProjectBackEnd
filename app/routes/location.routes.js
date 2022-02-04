module.exports = app => {
    const locations = require("../controllers/location.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", locations.create);
  
    // Retrieve all location
    router.get("/", locations.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", locations.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", locations.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", locations.delete);
  
    // Delete all location
    router.delete("/", locations.deleteAll);
  
    app.use('/api/locations', router);
  };