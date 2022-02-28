
module.exports = {
    HOST: "t3-database-2.cwre8cvv6tyn.us-west-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "seiv-t3-2021",
    DB: "tutordb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };