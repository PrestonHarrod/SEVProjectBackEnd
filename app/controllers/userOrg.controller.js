const db = require("../models");
const UserOrg = db.userOrgs;
const Op = db.Sequelize.Op;

// Create and Save a new org
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a userOrgs
    //comment for autodeploy
    const userOrg = {
      id: req.body.id,
      userID: req.body.userID,
      orgID: req.body.orgID,
      
    };
  
    // Save Type in the database
    UserOrg.create(userOrg)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the userRole."
        });
      });
  }

// Retrieve all userOrgs from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    UserOrg.findAll()
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

exports.findStudentsOrgID = (req, res) => {
  const userID = req.params.id;
  var condition = userID ? {
    userID: {
      [Op.eq]: userID
    }
  } : null;
  UserOrg.findAll({where: condition})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Types."
    });
  });
}
// Find a single userOrg with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  UserOrg.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserOrg with id=" + id
      });
    });
};


// Update a UserOrg by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    UserOrg.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Org was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Role with id=" + id
        });
      });
  };

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
    UserOrg.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Type was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Type with id=${id}. Maybe the type was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete type with id=" + id
        });
      });
  };

// Delete all Typess from the database.
exports.deleteAll = (req, res) => {
    UserOrg.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} all userOrgs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all UserOrgs."
        });
      });
  };