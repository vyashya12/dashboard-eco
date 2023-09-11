const BackupStatus = require("../models/backup.model");
const uuid = require("uuid");

// Create and Save a new BackupStatus
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Server
  const backupStatus = new BackupStatus({
    id: uuid.v4(),
    IP: req.body.IP,
    Status: req.body.Status.toString(),
    LastUpdate: req.body.LastUpdate,
  });

  // Save BackupStatus in the database
  BackupStatus.create(backupStatus, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BackupStatus.",
      });
    else res.send(data);
  });
};

// Retrieve all backupStatus from the database (with condition or none).
exports.findAll = (req, res) => {
  const IP = req.query.IP;
  console.log("Hi in controller backup");

  BackupStatus.getAll(IP, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BackupStatus.",
      });
    else res.send(data);
  });
};
