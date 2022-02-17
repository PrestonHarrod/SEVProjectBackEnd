const { userRoles, roles, tutorSubjects, subjects, orgs, userOrgs } = require("../models");
const db = require("../models");
const Sequelize = require('sequelize');
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
    //comment for autodeploy
    const user = {
      userID: req.body.userID,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      level: req.body.level
    
   
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  }

// Retrieve all Users from the database.

exports.findAll = (req, res) => {
  const id = req.params.id;

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.findAllTutorSubjects = (req, res) => {
    const roleID = req.params.id;

    var condition = roleID ? {
      roleID: {
        [Op.eq]: roleID
      }
    } : null;
    User.findAll({
      raw: true,
      attributes: ['userID', 'fName', 'lName'], 
      include: 
        [ 
          //  {model: userOrgs, as: 'userOrg', attributes: ['userID', 'orgID'], 
          //    include: 
          //     {model: orgs, as: 'org', attributes: ['orgID', [Sequelize.fn('GROUP_CONCAT', ' ' , Sequelize.col('name')), 'name']]}
          //  },
          {model: tutorSubjects, as: 'tutorSubject', attributes: ['tutorID', 'subjectID'], 
            include: 
              {model: subjects, as: 'subject', attributes: ['subjectID', [Sequelize.fn('GROUP_CONCAT', ' ' , Sequelize.col('name')), 'name']]}
          }, 
          {model: userRoles, as: 'userRoles', attributes: ['userID', 'roleID'], 
            include: 
              {model: roles, as: 'role', attributes: ['roleID']},
            where: condition
          }
        ],
        group: ['userID']
        })

      .then(data => {
        res.send(data);
       
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
    };


    exports.findAllByRole = (req, res) => {
      const roleID = req.params.id;
  
      var condition = roleID ? {
        roleID: {
          [Op.eq]: roleID
        }
      } : null;
      User.findAll({
        raw: true,
        attributes: ['userID', 'fName', 'lName'], 
        include: 
          [  
            {model: userRoles, as: 'userRoles', attributes: ['userID', 'roleID'], 
              include: 
                {model: roles, as: 'role', attributes: ['roleID']},
              where: condition
            }
          ],
          group: ['userID']
          })
  
        .then(data => {
          res.send(data);
         
      })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving all tutors."
          });
        });
      };
  

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${userID}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + userID
        });
      });
  };

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${userID}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + userID
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
      });
  };