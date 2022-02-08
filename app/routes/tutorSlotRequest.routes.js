module.exports = app => {
    const tutorSlotRequests = require("../controllers/tutorSlotRequest.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorSlotRequests.create);
  
    // Retrieve all Request
    router.get("/", tutorSlotRequests.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorSlotRequests.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorSlotRequests.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorSlotRequests.delete);
  
    // Delete all request
    router.delete("/", tutorSlotRequests.deleteAll);
  
    app.use('/api/tutorSlotRequests', router);
  };