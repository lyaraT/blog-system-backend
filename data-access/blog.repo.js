const db = require("../database/database");

exports.create = async (data) => {
    const response = await db.connection.promise().query('INSERT INTO blogs SET ?', data);
    return response[0]
};

// exports.getAll = async (query) => {
//     const response = await db.connection.promise().query(query);
//     return response[0]
// };

exports.getAll = async (query, page, pageSize) => {
    // Calculate the offset
    const offset = (page - 1) * pageSize;

    // Modify the SQL query to include pagination parameters
    const paginatedQuery = `${query} LIMIT ${pageSize} OFFSET ${offset}`;

    // Execute the paginated query to get the data
    const [dataRows] = await db.connection.promise().query(paginatedQuery);

    // Execute the query without LIMIT and OFFSET to get the total count of records
    const totalCountQuery = `SELECT COUNT(*) AS total FROM (${query}) AS countQuery`;
    const [totalCountRows] = await db.connection.promise().query(totalCountQuery);
    const totalCount = totalCountRows[0].total;

    // Return an object containing both the paginated data and the total count
    return { data: dataRows, total: totalCount };
};

exports.getOne = async (query) => {
    let response = await db.connection.promise().query(query);
    return response[0];
};

exports.update = async (id, updatedFields) => {
    try {
        const { title, subTopic, type, isActive, status, content, imgUrl } = updatedFields;

        // Construct the SQL query with placeholders
        const query = `UPDATE blogs SET title = ?, subTopic = ?, type = ?, isActive = ?, status = ?, content = ?, imgUrl = ? WHERE idblogs = ?`;

        // Execute the query with actual values for the placeholders
        const result = await db.connection.promise().query(query, [title, subTopic, type, isActive, status, content, imgUrl, id]);
        console.log(result)
        return result[0];
    } catch (error) {
        throw error;
    }
};
