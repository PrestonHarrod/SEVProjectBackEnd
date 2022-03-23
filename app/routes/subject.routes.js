module.exports = app => {
    const subjects = require("../controllers/subject.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", subjects.create);
  
    // Retrieve all user
    router.get("/", subjects.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", subjects.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", subjects.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", subjects.delete);
  
    // Delete all subject
    router.delete("/", subjects.deleteAll);

    router.get("/subjectName/:subjectName", subjects.findSubjectIDByName);
  
    app.use('/api/subjects', router);
  };