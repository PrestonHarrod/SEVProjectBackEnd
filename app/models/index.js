const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//all models go here VVVVVVVVVVVVVVVV
db.users = require("./user.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);
db.orgs= require("./org.model.js")(sequelize, Sequelize);
db.requests = require("./request.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.sessions = require("./session.model.js")(sequelize, Sequelize);
db.subjects = require("./subject.model.js")(sequelize, Sequelize);
db.tutorSlots = require("./tutorSlot.model.js")(sequelize, Sequelize);
db.tutorSubjects = require("./tutorSubject.model.js")(sequelize, Sequelize);
db.loginTokens = require("./loginToken.model.js")(sequelize, Sequelize);
db.userRoles = require("./userRole.model.js")(sequelize, Sequelize);
db.userOrgs = require("./userOrg.model.js")(sequelize, Sequelize);
db.tutorSlotRequests = require("./tutorSlotRequest.model.js")(sequelize, Sequelize);


//relationships -- tutorSubjecs


db.subjects.hasMany(db.tutorSubjects, {
  as: 'tutorSubject', foreignKey: 'subjectID'
});

db.tutorSubjects.belongsTo(db.subjects, {
  foreignKey: 'subjectID'
});

db.users.hasMany(db.tutorSubjects, {
  as: 'tutorSubject', foreignKey: 'tutorID'
});

db.tutorSubjects.belongsTo(db.users, {
  foreignKey: 'tutorID'
});

db.users.belongsToMany(db.subjects, {
  through: "tutor_Subject", 
  as: "subjects",
  foreignKey: "subjectID"
});

db.subjects.belongsToMany(db.users, {
  through: "tutor_Subject", 
  as: "users",
  foreignKey: "tutorID"
});

//------------ userRoles

db.users.hasMany(db.userRoles, {
  as: 'userRoles', foreignKey: 'userID'
});


db.userRoles.belongsTo(db.users, {
  foreignKey: 'userID'
});

db.roles.hasMany(db.userRoles, {
  as: 'userRoles', foreignKey: 'roleID'
});

db.userRoles.belongsTo(db.roles, {
  foreignKey: 'roleID'
});

db.users.belongsToMany(db.roles, {
  through: "userRole", 
    as: "roles",
  foreignKey: "roleID"
});

db.roles.belongsToMany(db.users, {
  through: "userrole", 
  as: "users",
  foreignKey: "userID"
});

//NEEDS THE BELONG TO MANY

//------------LoginToken
db.loginTokens.belongsTo(db.roles, {
  foreignKey: 'roleID'
});

//------------User
// db.users.belongsTo(db.userOrgs, {
//   foreignKey: 'userID'
// });

// db.userOrgs.hasMany(db.users, {
//   as: 'users'
// });
// db.users.hasMany(db.userOrgs, {
//   as: 'userOrgs',  foreignKey: 'userID'
// });

//------------userOrgs
db.orgs.hasMany(db.userOrgs, {
  as: 'userOrg', foreignKey: "orgID"
});

db.userOrgs.belongsTo(db.orgs, {
  foreignKey: 'orgID'
});
db.users.hasMany(db.userOrgs, {
  as: 'userOrg', foreignKey: "userID"
});

db.userOrgs.belongsTo(db.users, {
  foreignKey: 'userID'
});


db.users.belongsToMany(db.orgs, {
  through: "user_Org", 
  as: "orgs",
  foreignKey: "orgID"
});

db.orgs.belongsToMany(db.users, {
  through: "user_Org", 
  as: "users",
  foreignKey: "userID"
});

//-----------Session

db.sessions.belongsTo(db.users, {
  foreignKey: 'tutorID'
});

db.sessions.belongsTo(db.users, {
  foreignKey: 'studentID'
});

db.sessions.belongsTo(db.locations, {
  foreignKey: 'locationID'
});

db.locations.hasMany(db.sessions, {
  as: 'sessions', foreignKey: 'locationID'
});

db.users.hasMany(db.sessions, {
  as: 'sessions', foreignKey: 'studentID', foreignKey: 'tutorID'
});

//------------Tutorslot

// db.tutorSlots.belongsTo(db.users, {
//   foreignKey: 'tutorID'
// });
// db.tutorSlots.belongsTo(db.users, {
//   foreignKey: 'studentID'
// });

// db.users.hasMany(db.tutorSlots, {
//   as: 'tutorSlots', foreignKey: "userID"
// });

//----------Request
db.requests.belongsTo(db.users, {
  foreignKey: 'studentID'
});
db.requests.belongsTo(db.orgs, {
  foreignKey: 'orgID'
});

db.users.hasMany(db.requests, {
  as: 'requests', foreignKey: "userID"
});

db.orgs.hasMany(db.requests, {
  as: 'requests', foreignKey: 'orgID'
});
//TutorSlot
// db.tutorSlots.belongsTo(db.tutorSlotRequests, {
//   foreignKey: 'tutorSlotRequestID'
// });
// db.tutorSlotRequests.hasMany(db.tutorSlots, {
//   as: 'tutorSlotRequests',
//   foreignKey: "tutorSlotID"
// });


//tutorSlotRequest

// db.tutorSlotRequests.belongsTo(db.users, {
//   foreignKey: 'studentID'
// });
// db.users.hasMany(db.tutorSlotRequests, {
//   as: 'tutorSlotRequests', foreignKey: 'studentID'

// });
//subjectID
// db.tutorSlotRequests.belongsTo(db.subjects, {
//   foreignKey: 'subjectID'
// });
// db.subjects.hasMany(db.tutorSlotRequests, {
//   as: 'tutorSlotRequests', foreignKey: 'subjectID'
// });



module.exports = db;
