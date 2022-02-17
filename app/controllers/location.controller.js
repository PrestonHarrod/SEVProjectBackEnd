const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {
    // Validate request
    if (!req.body.locationID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Location
    //comment for autodeploy
    const location = {
      locationID: req.body.locationID,
      building: req.body.buildingID,
      roomNum: req.body.roomNum,
      desc: req.body.desc
   
    };
  
    // Save location in the database
    Location.create(location)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location."
        });
      });
  }

// Retrieve all Location from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
  
    Location.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving locations."
        });
      });
  };


// Find a single Location with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Location.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Location with id=" + id
      });
    });
};


// Update a Location by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Location.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Location with id=${locationID}. Maybe Location was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Location with id=" + locationID
        });
      });
  };

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Location.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Location was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Location with id=${locationID}. Maybe Location was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete location with id=" + locationID
        });
      });
  };

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
    Location.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Locations were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Locations."
        });
      });
  };