const db = require("../models");
const Org = db.orgs;
const Op = db.Sequelize.Op;

// Create and Save a new org
exports.create = (req, res) => {
    // Validate request
    if (!req.body.orgID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a org
    //comment for autodeploy
    const org = {
      orgID: req.body.orgID,
      name: req.body.name
    };
  
    // Save Type in the database
    Org.create(org)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the org."
        });
      });
  }

// Retrieve all orgs from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Org.findAll()
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


// Find a single Org with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Org.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Org with id=" + id
      });
    });
};


// Update a Org by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Org.update(req.body, {
      where: { orgID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Org was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Role with id=${orgID}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Role with id=" + orgID
        });
      });
  };

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Org.destroy({
      where: { orgID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Type was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Type with id=${orgID}. Maybe the type was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete type with id=" + orgID
        });
      });
  };

// Delete all Typess from the database.
exports.deleteAll = (req, res) => {
    Org.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} all orgs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all orgs."
        });
      });
  };