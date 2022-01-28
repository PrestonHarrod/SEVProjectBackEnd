const db = require("../models");
const LoginToken = db.loginTokens;
const User = db.users;
const Op = db.Sequelize.Op;
const authconfig = require('../config/auth.config.js');

var jwt = require("jsonwebtoken");
const { advisor } = require("../models");
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
  let advisorID = null;
  let studentID = null;
  let userID = null;
  let fName = null;
  let token = null;

  // Look for an advior in the database
  let userFound = false;
  await User.findOne({ where : {email:email}})
    .then(data => {
        if (data != null) {
        let advisor= data.dataValues;
        token = jwt.sign({ id: advisor.email }, authconfig.secret, {expiresIn: 86400}); // 24 hours
        email = advisor.email;
        advisorID = advisor.advisorID;
        studentID = null;
        adminID = null;
        userID = advisor.advisorID;
        fName = advisor.fName;
        userFound = true;

        }
    }).catch(err => {
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });

    //Look for admin in DB
  await Admin.findOne({ where : {email:email}})
    .then(data => {
        if (data != null) {
        let admin= data.dataValues;
        token = jwt.sign({ id: admin.email }, authconfig.secret, {expiresIn: 86400}); // 24 hours
        email = admin.email;
        adminID = admin.adminID;
        studentID = null;
        advisorID = null
        userID = admin.adminID;
        fName = admin.fName;
        userFound = true;

        }
    }).catch(err => {
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });

    // Look for a student in the database
    //comment
      await Student.findOne({where : {email:email}
      })
      .then(data => {
        if (data != null) {         
            let student = data.dataValues;
           // console.log("Data Values: " + data.dataValues.studentID)
            token = jwt.sign({ id: student.email }, authconfig.secret, {expiresIn: 86400}); // 24 hours
            email = student.email;
            advisorID = null
            adminID = null;
            studentID = student.studentID;
            userID  = student.studentID;
            fName = student.fName;
            userFound = true;
         }

      }).catch(err => {
        res.status(401).send({
          message: err.message || "Count not find user"
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
  const session = {
    token: token,
    advisorID : advisorID,
    studentID : studentID,
    adminID : adminID,
    expireDate: tokenExpireDate
  };
  console.log(session.studentId)
  Session.create(session)
    .then(data => {
      let userInfo = {
        user : fName,
        studentID : studentID,
        advisorID: advisorID,
        adminID : adminID,
        userId : userID,
        token : session.token
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