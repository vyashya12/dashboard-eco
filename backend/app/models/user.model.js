const sql = require("./db.js");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { config } = require("dotenv");
const { sign } = require("jsonwebtoken");

//constructor
class User {
  constructor(user) {
    this.Name = user.Name;
    this.Email = user.Email;
    this.Password = user.Password;
    this.isAdmin = user.isAdmin;
    this.Company = user.Company;
  }

  //register a new user
  static register(newUser, result) {
    const salt = genSaltSync(10);
    newUser.Password = hashSync(newUser.Password, salt);
    sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Added new User: ", { id: res.insertId, ...User });
      result(null, { id: res.insertId, ...newUser });
    });
  }

  static login(user, result) {
    sql.query(
      `SELECT * FROM users WHERE email = "${user.Email}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.length) {
          const passwordIsValid = compareSync(user.Password, res[0].Password);
          if (!passwordIsValid) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          const token = sign(
            { id: res[0].id, name: res[0].Name, email: res[0].Email },
            "positive",
            {
              expiresIn: "2h",
            }
          );
          console.log("token created: ", token, res[0]);
          result(null, { token: token }, { user: res[0] });
          return;
        }
      }
    );
  }
}

module.exports = User;
