const mysql = require('mysql2');
const {SETTINGS} = require("../config/common.settings");

//creating connection to database
const connection = mysql.createConnection({
    host: SETTINGS.SQL_DB.HOST,
    user: SETTINGS.SQL_DB.USER,
    password: SETTINGS.SQL_DB.PASSWORD,
    database: SETTINGS.SQL_DB.DATABASE
});

const initDb = async ()=> {
    //connects to the database
    return connection.connect();
}
//exporting db method and connection
module.exports = {
    initDb: initDb,
    connection: connection
};
