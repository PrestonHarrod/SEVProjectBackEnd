module.exports = app => {
    const userRoles = require("../controllers/userRole.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", userRoles.create);
  
    // Retrieve all user
    router.get("/", userRoles.findAll);

    //get all roles
    router.get("/roles/:id", userRoles.findAllRoles);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", userRoles.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", userRoles.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", userRoles.delete);
  
    // Delete all user
    router.delete("/", userRoles.deleteAll);
  
    app.use('/api/userRoles', router);
  };

