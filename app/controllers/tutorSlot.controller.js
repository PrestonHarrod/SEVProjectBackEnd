const db = require("../models");
const TutorSlot = db.tutorslots;
const Op = db.Sequelize.Op;

// Create and Save a new TutorSlot
exports.create = (req, res) => {
    // Validate request
    if (!req.body.tutorSlotID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a TutorSlot
    //comment for autodeploy
    const tutorSlot = {
        tutorSlotID: req.body.tutorSlotID,
          tutorID: req.body.tutorSlotID,
          studentID: req.body.studentID,
          day: req.body.day,
          startTime:req.body.startTime,
          endTime:req.body.endTime,
          status: req.body.status,
          isScheduable: req.body.isScheduable,
          tutorSlotRequestID: req.body.tutorSlotRequestID
   
    };
  
    // Save tutorSLot in the database
    TutorSlot.create(tutorSlot)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the tutorslot."
        });
      });
  }

// Retrieve all tutorSlots from the database.
exports.findAll = (req, res) => {
    //const tutorSlotID = req.query.tutorSlotID;
  
    TutorSlot.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorSlots."
        });
      });
  };


// Find a single TutorSlot with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  TutorSlot.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TutorSlot with id=" + id
      });
    });
};


// Update a TutorSlot by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    TutorSlot.update(req.body, {
      where: { tutorSlotID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TutorSlot was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update TutorSLot with id=${tutorSlotID}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating tutorSlot with id=" + tutorSlotID
        });
      });
  };

// Delete a tutorSlot with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
    TutorSlot.destroy({
      where: { tutorSlotID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TutorSlot was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete TutorSlot with id=${tutorSlotID}. Maybe Session was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete tutorSlot with id=" + tutorSlotID
        });
      });
  };

// Delete all tutorSlots from the database.
exports.deleteAll = (req, res) => {
    TutorSlot.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} tutorSlots were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tutorslots."
        });
      });
  };