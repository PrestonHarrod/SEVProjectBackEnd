const db = require("../models");
const Subject = db.subjects;
const Op = db.Sequelize.Op;

// Create and Save a new Subject
exports.create = (req, res) => {
    // Validate request
    if (!req.body.subjectID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Subject
    //comment for autodeploy
    const subject = {
      subjectID: req.body.subjectID,
      name: req.body.name,
      teacher: req.body.teacher,
      level: req.body.level
   
    };
  
    // Save Subject in the database
    Subject.create(subject)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Subject."
        });
      });
  }

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Subject.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Subejcts."
        });
      });
  };


// Find a single Subject with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Subject.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Subject with id=" + id
      });
    });
};


// Update a Subject by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Subject.update(req.body, {
      where: { subjectID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subject was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Subject with id=${subjectID}. Maybe the subject was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Subject with id=" + subjectID
        });
      });
  };

// Delete a Subject with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Subject.destroy({
      where: { subjectID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Subject was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Subject with id=${subjectID}. Maybe the subject was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Subject with id=" + subjectID
        });
      });
  };

// Delete all Subjects from the database.
exports.deleteAll = (req, res) => {
    Subject.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Subjects were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all subjects."
        });
      });
  };