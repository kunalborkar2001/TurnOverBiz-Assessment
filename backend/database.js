const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('postgres://avnadmin:AVNS_49CL6HQXW-5cm2LanbD@kunalcluster-kunalborkarproject.a.aivencloud.com:15255/defaultdb?sslmode=no-verify') 
const sequelize = new Sequelize('postgres://avnadmin:AVNS_SKJVw8fOpSk3qSUUTwd@kunalserver-kunalborkarproject.a.aivencloud.com:15255/defaultdb?sslmode=no-verify') // Example for postgres

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });


module.exports = sequelize;
