const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

exports.getUser = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
};

exports.getUserData = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
};

exports.createUser = (req, res) => {
  // Validate request

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bycrypt.hashSync(req.body.password, 10),
    role: req.body.role,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send({ token: jwt.sign({ ...user._doc }, process.env.JWT_SECRET) });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with email " + req.body.email,
        });
      }
      if (bycrypt.compareSync(req.body.password, user.password)) {
        res.send({ token: jwt.sign({ ...user._doc }, process.env.JWT_SECRET) });
      } else {
        res.status(401).send({
          message: "Invalid email or password",
        });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with email " + req.body.email,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with email " + req.body.email,
      });
    });
};
