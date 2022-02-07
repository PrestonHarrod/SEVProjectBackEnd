const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Admin = db.admins;
const Advisor = db.advisors;
const Student = db.students;
const Session = db.sessions;
const Op = db.Sequelize.Op;


//authorization method. Authenticates 
//comment

authenticate = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authheader.substring(7, authheader.length);
      jwt.verify(token, config.secret, (err, decoded) => { //verify the token
        if (err){
          return res.json({
            success:false,
            message: 'token is not valid'
          })
        }
      });
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      var condition = token ? {
        token: {
          [Op.like]: `%${token}%`
        }
      } : null;
      //console.log(condition)
      Session.findOne({where : condition})
      .then(data=> {
        let session = data.dataValues;
        if (session != null)
        {
          //check to see if the session is expired
          if (session.expireDate > Date.now())
          {
            next();
            return;
          }
          else{
            return res.status(401).send({
              message: "error: token is expired"
            })
          }
         
        }
        else{
          return res.status(404).send({
            message: "error: cannot find session with token"
          })
        }

      })
      
    }
    else{
      return res.status(401).send({
        message: "Unauthorized access error: Token"
      })
    }

  }
}


//same as authenticate but the .then => data is different. make sure the advisor.role is advisor
isAdmin = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authheader.substring(7, authheader.length);
    //   jwt.verify(token, config.secret, (err, decoded) => { //verify the token
    //     if (err){
    //       return res.json({
    //         success:false,
    //         message: 'token is not valid'
    //       })
    //     }
    //   });
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        //check to see if session has the admin
        let session = data.dataValues;
        if (session!= null)
        {
          //find the adminID in the session
          if(session.adminID != null){
            Admin.findByPk(session.adminID)
            .then(data => {
              if(data.dataValues.role = "Admin")
              {
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: must be Admin"
                })
              }

            })
          }
        }
       })
      
    }
    else{
      return res.status(401).send({
        message: "Unauthorized access error: Token"
      })
    }

  }
}

isAdminOrAdvisor = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authheader.substring(7, authheader.length);
    //   jwt.verify(token, config.secret, (err, decoded) => { //verify the token
    //     if (err){
    //       return res.json({
    //         success:false,
    //         message: 'token is not valid'
    //       })
    //     }
    //   });
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        //check to see if session has the admin
        let session = data.dataValues;
        if (session!= null)
        {
          //find the adminID in the session
          if(session.adminID != null){
            Admin.findByPk(session.adminID)
            .then(data => {
              if(data.dataValues.role = "Admin")
              {
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: Must be advisor or Admin"
                })
              }

            })
          }
          else if(session.advisorID != null){
            Advisor.findByPk(session.advisorID)
            .then(data => {
              if(data.dataValues.role = "Advisor")
              {
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: Must be advisor or admin"
                })
              }

            })
          }
        }
       })
      
    }
    else{
      return res.status(401).send({
        message: "Unauthorized access error: Token"
      })
    }

  }
}


  

isAny = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authheader.substring(7, authheader.length);
    //   jwt.verify(token, config.secret, (err, decoded) => { //verify the token
    //     if (err){
    //       return res.json({
    //         success:false,
    //         message: 'token is not valid'
    //       })
    //     }
    //   });
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        //check to see if session has the admin
        let session = data.dataValues;
        if (session!= null)
        {
          //find the adminID in the session
          if(session.adminID != null){
            Admin.findByPk(session.adminID)
            .then(data => {
              if(data.dataValues.role = "Admin")
              {
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: Must have a role"
                })
              }

            })
          }
          else if(session.advisorID != null){
            Advisor.findByPk(session.advisorID)
            .then(data => {
              if(data.dataValues.role = "Advisor")
              {
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: Must have a role"
                })
              }

            })
          }
          else if (session.studentID != null)
          {
            Student.findByPk(session.studentID)
            .then(data => {
              if(data.dataValues.role = "Student")
              {
                console.log(data.dataValues.role)
                next();
                return;
              }
              else {
                return res.status(403).send({
                  message: "Unauthorized access: Must have a role"
                })
              }

            })
          }
        }
       })
      
    }
    else{
      return res.status(401).send({
        message: "Unauthorized access error: Token"
      })
    }

  }
}



const authJwt = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAdminOrAdvisor: isAdminOrAdvisor,
  isAny: isAny
  
};
module.exports = authJwt;
