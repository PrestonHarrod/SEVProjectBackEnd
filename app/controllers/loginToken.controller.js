const db = require("../models");
const LoginToken = db.loginTokens;
const Op = db.Sequelize.Op;

// Create and Save a new Login Token
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Login Token
    //comment for autodeploy
    const loginToken = {
      token: req.body.token,
      userID: req.body.userID,
      email: req.body.email
    };
  
    // Save Type in the database
    LoginToken.create(loginToken)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the token."
        });
      });
  }

// Retrieve all tokens from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    LoginToken.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Types."
        });
      });
  };


// Find a single LoginToken with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  LoginToken.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving tokens with id=" + id
      });
    });
};


// Update a token by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    LoginToken.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Login Tokens was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Role with id=${token}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Role with id=" + token
        });
      });
  };

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    LoginToken.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Type was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Type with id=${token}. Maybe the type was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete type with id=" + token
        });
      });
  };

// Delete all Typess from the database.
exports.deleteAll = (req, res) => {
    LoginToken.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} all tokens were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tokens."
        });
      });
  };