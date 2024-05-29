const db = require("../database/database");

exports.create = async (data) => {
    const response = await db.connection.promise().query('INSERT INTO slots SET ?', data);
    return response[0]
};

// exports.getAll = async (query) => {
//     const response = await db.connection.promise().query(query);
//     return response[0]
// };

exports.getAll = async (query) => {
    try {
        // Execute the query to get the data
        const [dataRows] = await db.connection.promise().query(query);
        console.log(dataRows);

        // Return the data
        return dataRows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};


exports.deleteOne = async (query) => {
    let response = await db.connection.promise().query(query);
    return response[0];
};

exports.update = async (id, updatedFields) => {
    try {
      

        // Construct the SQL query with placeholders
        const query = `UPDATE slots SET available = ? WHERE id = ?`;

        // Execute the query with actual values for the placeholders
        const result = await db.connection.promise().query(query, [false, id]);
        console.log(result)
        return result[0];
    } catch (error) {
        throw error;
    }
};