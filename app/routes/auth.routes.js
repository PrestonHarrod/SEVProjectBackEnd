module.exports = app => {
    const Auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Login
    router.post("/login", Auth.login);
  
    // Logout
    router.post("/logout", Auth.logout);
  
    app.use('/api/auth', router);
  };