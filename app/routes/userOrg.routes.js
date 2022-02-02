module.exports = app => {
    const userOrgs = require("../controllers/userOrg.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", userOrgs.create);
  
    // Retrieve all user
    router.get("/", userOrgs.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", userOrgs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", userOrgs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", userOrgs.delete);
  
    // Delete all user
    router.delete("/", userOrgs.deleteAll);
  
    app.use('/api/userOrgs', router);
  };
