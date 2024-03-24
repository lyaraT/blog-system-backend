const db = require("../database/database");

exports.create = async (data) => {
    const response = await db.connection.promise().query('INSERT INTO user SET ?', data);
    return response[0]
};




exports.getOne = async (query) => {
    let response = await db.connection.promise().query(query);
    return response[0];
};

exports.getOneByEmail = async (data) => {
    const email = db.connection.escape(data.email);
    const query = `SELECT * FROM user WHERE email = ${email}`;
    let [rows] = await db.connection.promise().query(query);
    return rows.length > 0 ? rows[0] : null;
};

exports.getAll = async (query) => {
    const response = await db.connection.promise().query(query);
    return response[0]
};

// Get a random joke from the mySQL db based on the specified joke type
exports.update = async (query,data) => {
    let response = await db.connection.promise().query(query, [data.fullname, data.password, data.role, data.dob, data.email, data.iduser]);
    return response[0];
};
// exports.delete = async (data) => {
//     const response = await db.connection.promise().query('INSERT INTO jokes SET ?', data);
//     return response[0]
// };
