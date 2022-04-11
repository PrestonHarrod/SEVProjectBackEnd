const db = require("../models");
const UserRole = db.userRoles;
const Op = db.Sequelize.Op;

// Create and Save a new org
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.Userid) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // } //dont do this since it is autoincremented
  
    // Create a userRole
    //comment for autodeploy
    const userRole = {
      id: req.body.id,
      userID: req.body.userID,
      roleID: req.body.roleID,
      
    };
  
    // Save Type in the database
    UserRole.create(userRole)
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

// Retrieve all userRoles from the database.
exports.findAll = (req, res) => {
    console.log("IM HERE")
    const userID = req.params.id;
    var condition = userID ? { userID: { [Op.eq]: userID } } : null;

  console.log(condition)
    UserRole.findAll({where: condition})
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

  exports.findAllRoles = (req, res) => {
    const id = req.query.id;
  
    UserRole.findAll({attributes: ['roleID']},{where: { userID: id }} )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all roles from an ID."
        });
      });
  };

  


// Find a single userRole with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserRole.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Userrole with id=" + id
      });
    });
};


// Update a UserRole by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    UserRole.update(req.body, {
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
  const userID = req.query.userID;
  const roleID = req.query.roleID;
  
    UserRole.destroy({
      where: { userID: userID,
       roleID: roleID}
    })
      .then(num => {
        console.log("Cool: the delete one was called");
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
  //delete all where the userID = userID
  console.log("you hit the right place!");
  const userID = req.query.id;

    UserRole.destroy({
      where: { userID: userID},
      truncate: false
    })
      .then(nums => {
        console.log("whoops: the delete all was called");
        res.send({ message: `${nums} all userRoles were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all UserRoles."
        });
      });
  };