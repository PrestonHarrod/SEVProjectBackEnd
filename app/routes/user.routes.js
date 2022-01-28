module.exports = app => {
    const users = require("../controllers/user.controller.js");
    //const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all user
    router.get("/", users.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Delete all user
    router.delete("/", users.deleteAll);
  
    app.use('/api/admins', router);
  };


//   //NOTE: deleted the authorization for now
//   router.get("/:id", [auth.authenticate, auth.isUser], users.findOne);
  
//   // Update a Tutorial with id
//   router.put("/:id", [auth.authenticate, auth.isUser], users.update);

//   // Delete a Tutorial with id
//   router.delete("/:id", [auth.authenticate, auth.isUser], users.delete);

//   // Delete all user
//   router.delete("/", [auth.authenticate, auth.isUser], users.deleteAll);