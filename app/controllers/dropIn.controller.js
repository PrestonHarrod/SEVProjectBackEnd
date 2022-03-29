const db = require("../models");
const DropIn = db.dropIns;
const Op = db.Sequelize.Op;

// Create and Save a new Drop In entry
exports.create = (req, res) => {
  
    // Create a Drop in
    //comment for autodeploy
    const dropIn = {
      fname: req.body.fname,
      lname: req.body.lname,
      date: req.body.date,
      email: req.body.email,
      studentIDNum: req.body.studentIDNum,
      subject: req.body.subject,
   
    };
  
    // Save Drop In in the database
    DropIn.create(dropIn)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Drop IN."
        });
      });
  }

// Retrieve all Drop In from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    DropIn.findAll()
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


// Find a single Drop In with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  DropIn.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Drop In  with id=" + id
      });
    });
};


// Update a Drop In by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
    DropIn.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Drop In was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update DropIn with id=${id}. Maybe the Drop In was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Drop In with id=" + id
        });
      });
  };

// Delete a Drop In with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  
    DropIn.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Drop In was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Drop In with id=${id}. Maybe the Drop In was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Drop In with id=" + id
        });
      });
  };

// Delete all Drop In entries from the database.
exports.deleteAll = (req, res) => {
    DropIn.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Drop Ins were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Drop Ins."
        });
      });
  };
