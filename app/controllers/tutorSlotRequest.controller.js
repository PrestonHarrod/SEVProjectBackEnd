const db = require("../models");
const TutorSlotRequest = db.tutorSlotRequests;
const Op = db.Sequelize.Op;

// Create and Save a new TSR
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tutorSlotRequestID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a TSR
    //comment for autodeploy
    const tutorSlotRequest = {
      tutorSlotRequestID: req.body.tutorSlotRequestID,
      tutorSlotID: req.body.tutorSlotID,
      studentID: req.body.studentID,
      subjectID: req.body.subjectID,
      desc: req.body.desc,
      isAccepted: req.body.isAccepted,
      isGroupSession: req.body.isGroupSession
      
    
    };
  
    // Save TSR in the database
    TutorSlotRequest.create(tutorSlotRequest)
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

// Retrieve all TSRs from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    TutorSlotRequest.findAll()
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


// Find a single TSR with an id
exports.findOne = (req, res) => {
    const id = req.query.id;

  TutorSlotRequest.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Request with id=" + id
      });
    });
};


// Update a TSR by the id in the tsr
exports.update = (req, res) => {
    const id = req.query.id;
  
    TutorSlotRequest.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Request with id=${tutorSlotRequestID}. Maybe REquest was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Request with id=" + tutorSlotRequestID
        });
      });
  };

// Delete a TSR with the specified id in the TSR
exports.delete = (req, res) => {
    const id = req.query.id;
  
    TutorSlotRequest.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Request with id=${tutorSlotRequestID}. Maybe Request was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Request with id=" +tutorSlotRequestID
        });
      });
  };

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
    TutorSlotRequest.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} TSR were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all TSRs."
        });
      });
  };