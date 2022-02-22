const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.roleID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Role
    //comment for autodeploy
    const role = {
      roleID: req.body.roleID,
      type: req.body.type
    };
  
    // Save Type in the database
    Role.create(role)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Role."
        });
      });
  }

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Role.findAll()
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


// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id
      });
    });
};


// Update a Role by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Role.update(req.body, {
      where: { roleID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Role with id=${roleID}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Role with id=" + roleID
        });
      });
  };

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Role.destroy({
      where: { roleID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Type was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Type with id=${roleID}. Maybe the type was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete type with id=" + roleID
        });
      });
  };

// Delete all Typess from the database.
exports.deleteAll = (req, res) => {
    Role.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} all roles were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all roles."
        });
      });
  };