module.exports = app => {
    const tutorSubjects = require("../controllers/tutorSubject.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", tutorSubjects.create);
  
    // Retrieve all user
    router.get("/", tutorSubjects.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorSubjects.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorSubjects.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorSubjects.delete);
  
    // Delete all user
    router.delete("/", tutorSubjects.deleteAll);
  
    app.use('/api/tutorSubjects', router);
  };