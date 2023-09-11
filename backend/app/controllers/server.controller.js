const Server = require("../models/server.model.js");
const uuid = require("uuid");

// Create and Save a new Server
exports.create = (req, res) => {
  // scriptPassword = req.header.password
  // scriptUsername = req.header.username

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (
    req.body.APIPassword != process.env.SCRIPTPASSWORD ||
    req.body.APIPassword == undefined
  ) {
    res.status(400).send({
      message: "Some error occurred while creating the Server.",
    });
  } else {
    // Create a Server
    const server = new Server({
      id: uuid.v4(),
      ServerName: req.body.ServerName.toString(),
      IP: req.body.IP.toString(),
      Drive: req.body.Drive.toString(),
      Size: parseFloat(req.body.Size),
      SizeFree: parseFloat(req.body.SizeFree),
      SizeUsed: parseFloat(req.body.SizeUsed),
      PercentFree: parseInt(req.body.PercentFree),
      TotalMemory: parseFloat(req.body.TotalMemory),
      FreeMemory: parseFloat(req.body.FreeMemory),
      UsedMemory: parseFloat(req.body.UsedMemory),
      OnlineVPS: req.body.OnlineVPS,
      OfflineVPS: req.body.OfflineVPS,
      LastUpdate: req.body.LastUpdate.toString(),
      ServerUptime: parseInt(req.body.ServerUptime),
    });

    // Save Server in the database
    Server.create(server, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Server.",
        });
      else res.send(data);
    });
  }
};

// Retrieve all servers from the database (with condition).
exports.findAll = (req, res) => {
  const IP = req.query.IP;

  Server.getAll(IP, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving servers.",
      });
    else res.send(data);
  });
};

// Find a single Server by Id
exports.findOne = (req, res) => {
  Server.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Server with id ${req.params.id} not found.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Server with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published Servers
// exports.findAllPublished = (req, res) => {
//   Server.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving servers."
//       });
//     else res.send(data);
//   });
// };

// Update a Server identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Server.updateById(req.params.id, new Server(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Server with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Server with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Server with the specified id in the request
exports.delete = (req, res) => {
  Server.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Server with id ${req.params.id} not found.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Server with id " + req.params.id,
        });
      }
    } else res.send({ message: `Server was deleted successfully!` });
  });
};

// Delete all Server from the database.
exports.deleteAll = (req, res) => {
  Server.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all servers.",
      });
    else res.send({ message: `All Servers were deleted successfully!` });
  });
};
