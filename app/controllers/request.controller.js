const db = require("../models");
const Request = db.requests;
const Op = db.Sequelize.Op;

// Create and Save a new Request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.studentID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Request
    //comment for autodeploy
    const request = {
      userID: req.body.userID,
      Type: req.body.type,
      desc: req.body.desc,
      studentID: req.body.userID,
      orgID: req.body.orgID
      
    
    };
    console.log(request.Type)
  
    // Save Request in the database
    Request.create(request)
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

// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Request.findAll()
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


// Find a single Request with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Request.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Request with id=" + id
      });
    });
};


// Update a Request by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    Request.update(req.body, {
      where: { requestID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Request with id=${requestID}. Maybe REquest was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Request with id=" + requestID
        });
      });
  };

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
    Request.destroy({
      where: { requestID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Request with id=${requestID}. Maybe Request was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Request with id=" + requestID
        });
      });
  };

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
    Request.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} REquests were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Requests."
        });
      });
  };