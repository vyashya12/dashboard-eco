const User = require("../models/user.model");
const uuid = require("uuid");

//Register new User and save it
exports.register = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  //Create new User
  const user = new User({
    id: uuid.v4(),
    Name: req.body.Name.toString(),
    Email: req.body.Email.toString(),
    Password: req.body.Password.toString(),
    isAdmin: req.body.isAdmin,
    Company: req.body.Company.toString(),
  });

  User.register(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while registration",
      });
    } else {
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }

  const user = new User({
    Email: req.body.Email.toString(),
    Password: req.body.Password.toString(),
  });
  User.login(user, (err, data, user) => {
    if (err) {
      res.send({
        message: err.message || "Some error occured while registration",
      });
    } else {
      if (data) {
        res.send({ token: data.token, user: user.user });
      } else {
        res.send({ message: "Invalid Credentials" });
      }
    }
  });
};
