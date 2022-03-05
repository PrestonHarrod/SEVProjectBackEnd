module.exports = app => {
    const tutorSlots = require("../controllers/tutorSlot.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorSlots.create);
  
    // Retrieve all user
    router.get("/", tutorSlots.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorSlots.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorSlots.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorSlots.delete);
  
    // Delete all user
    router.delete("/", tutorSlots.deleteAll);

    router.get("/tutorSlotUnbook/:id", tutorSlots.findOneForStudent);

    router.get("/tutorSlotForTutor/:id",tutorSlots.getAllForTutor);
  
 +   app.use('/api/tutorSlots', router);
  };

