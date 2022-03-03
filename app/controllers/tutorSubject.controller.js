const db = require("../models");
const TutorSubject = db.tutorSubjects;

const Op = db.Sequelize.Op;

// Create and Save a new org
exports.create = (req, res) => {
  
    // Create a tutorSubject
    //comment for autodeploy
    const tutorSubject = {
      id: req.body.id,
      tutorID: req.body.tutorID,
      subjectID: req.body.subjectID,
      
    };
  
    // Save Type in the database
    TutorSubject.create(tutorSubject)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the tutorSubject."
        });
      });
  }

// Retrieve all tutorSubjects from the database.
exports.findAll = (req, res) => {
  const tutorID = req.query.tutorID;
  console.log(tutorID + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  var condition = tutorID ? {
    tutorID: {
      [Op.like]: `%${tutorID}%`
    }
  } : null;

  TutorSubject.findAll({ where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subjects."
      });
    });
};


// Find a single tutorSubject with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  TutorSubject.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorsubject with id=" + id
      });
    });
};


// Update a tutor subject by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    TutorSubject.update(req.body, {
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
  
    TutorSubject.destroy({
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
    const tutorID = req.query.tutorID;
    const subjectID = req.query.subjectID;

    TutorSubject.destroy({
      where: { tutorID: tutorID,
               subjectID: subjectID},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} all tutorSubjects were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all TutorSubjects."
        });
      });
  };
