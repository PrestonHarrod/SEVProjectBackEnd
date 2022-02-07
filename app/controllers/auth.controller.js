const db = require("../models");
const LoginToken = db.loginTokens;
const User = db.users;
const Op = db.Sequelize.Op;
const authconfig = require('../config/auth.config.js');

var jwt = require("jsonwebtoken");
const { user } = require("../models");
exports.login = async (req, res) => {

  if (!req.body.accessToken) {
    console.log("accessToken");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  //console.log(req.body.accessToken)
  // code from word doc to authenticate token from frontend
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client('738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com');
  const ticket = await client.verifyIdToken({
    idToken: req.body.accessToken,

    audience: '738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com'
  });
  const payload= ticket.getPayload();
  //console.log('Google payload is '+JSON.stringify(payload));
  let email = payload['email'];

  let user = {};
  //let eMail = null;
  let userID = null;
  let token = null;

  // Look for an advior in the database
  let userFound = false;
  await User.findOne({ where : {email:email}})
    .then(data => {
        if (data != null) {
        let user = data.dataValues;
        token = jwt.sign({ id: founduser.email }, authconfig.secret, {expiresIn: 86400}); // 24 hours
        email = user.email;
        userID = user.userID
        fName = user.fName;
        userFound = true;

        }
    }).catch(err => {
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });
    if (!userFound) {
      res.status(401).send({
        message: "User Not Found"
      });
      return;
    }
  let tokenExpireDate =new Date();
  tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
  const login = {
    token: token,
    userID : userID,
    expireDate: tokenExpireDate
  };
  console.log(login.userID)
  LoginToken.create(login)
    .then(data => {
      let userInfo = {
        user : fName,
        userID : userID,
        token : login.token
      };
      
      res.send(userInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Session."
      });
    });
  }

exports.logout = async (req, res) => {
    return;
};