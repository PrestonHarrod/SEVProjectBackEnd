module.exports = app => {
    const sessions = require("../controllers/session.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sessions.create);
  
    // Retrieve all session
    router.get("/", sessions.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", sessions.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", sessions.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", sessions.delete);
  
    // Delete all session
    router.delete("/", sessions.deleteAll);

    router.delete("/tutorSlot/:id", sessions.deleteByTutorSlotID);

    router.get("/tutorSlot/:id", sessions.findByTutorSlot);
  
    app.use('/api/sessions', router);
  };
