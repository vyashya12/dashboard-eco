module.exports = (app) => {
  const servers = require("../controllers/server.controller.js");
  const users = require("../controllers/user.controller.js");
  const backupStatus = require("../controllers/backup.controller.js");
  const rateLimiterUsingThirdParty = require("../middlewares/rateLimiter.js");
  const verifyToken = require("../middlewares/verifyToken.js");

  var router = require("express").Router();

  //Register new user
  router.post("/register", users.register);

  //Login with registered account
  router.post("/login", users.login);

  // Create a new Server
  router.post("/", rateLimiterUsingThirdParty, servers.create);

  // Get All BackupStatus
  router.get("/status", backupStatus.findAll);

  // Retrieve all Servers
  router.get("/", verifyToken, servers.findAll);

  // Retrieve all published Servers
  // router.get("/published", servers.findAllPublished);

  // Retrieve a single Server with id
  router.get("/:id", verifyToken, servers.findOne);

  // Update a Server with id
  router.put("/:id", verifyToken, servers.update);

  // Delete a Server with id
  router.delete("/:id", verifyToken, servers.delete);

  // Delete all Servers
  router.delete("/", verifyToken, servers.deleteAll);

  //Create entry in backupStatus Table
  router.post("/status", backupStatus.create);

  app.use("/api/servers", router);
};
