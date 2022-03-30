const db = require("../models");
const Session = db.sessions;
const Op = db.Sequelize.Op;

// Create and Save a new Session
exports.create = (req, res) => {
    // Validate request
    if (!req.body.studentID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Session
    //comment for autodeploy
    const session = {
      sessionID: req.body.sessionID,
      locationID: req.body.locationID,
      tutorID: req.body.tutorID,
      studentID: req.body.studentID,
      date: req.body.date,
      scheduledStart: req.body.scheduledStart,
      scheduledEnd: req.body.scheduledEnd,
      sessionEnd: req.body.sessionEnd,
      status: req.body.status,
      tutorSlotID : req.body.tutorSlotID,
      feedback: req.body.feedback
   
    };
  
    // Save Session in the database
    Session.create(session)
      .then(data => {
        res.send(data);
        console.log(session.scheduledStart)
        console.log(session.scheduledEnd)
        console.log(session.feedback)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Session."
        });
      });
  }

// Retrieve all sessions from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  
    Session.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sessions."
        });
      });
  };


// Find a single Session with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id)

  Session.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Session with id=" + id
      });
    });
};


// Update a Session by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    Session.update(req.body, {
      where: { sessionID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Session was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Session with id=${sessionID}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Session with id=" + sessionID
        });
      });
  };

// Delete a Session with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
    Session.destroy({
      where: { sessionID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Session was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Session with id=${sessionID}. Maybe Session was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Session with id=" + sessionID
        });
      });
  };

// Delete all Sessions from the database.
exports.deleteAll = (req, res) => {
    Session.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Sessions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Sessions."
        });
      });
  };

  exports.deleteByTutorSlotID = (req, res) => {
    const id = req.params.id;
    
      Session.destroy({
        where: { tutorSlotID: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Session was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Session with id=${tutorSlotID}. Maybe Session was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Session with id=" + tutorSlotID
          });
        });
    };
    exports.findByTutorSlot = (req, res) => {
      const id = req.params.id;
      Session.findAll({where: { tutorSlotID: id }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sessions."
        });
      });

    }
