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
    return {data: dataRows, total: totalCount};
};

// Get a random joke from the mySQL db based on the specified joke type
exports.update = async (id, updatedFields) => {
    try {
        console.log(updatedFields);

        const {
            fullname,
            password,
            email,
            role,
            isActive,
            dob,
            isAuthenticated,
            nic,
            mobileNo,
            location,
            aboutMe
        } = updatedFields;

        // Construct the SQL query dynamically based on provided fields
        let query = `UPDATE user SET `;
        const params = [];

        if (fullname !== undefined) {
            query += `fullname = ?, `;
            params.push(fullname);
        }
        if (password !== undefined) {
            query += `password = ?, `;
            params.push(password);
        }
        if (email !== undefined) {
            query += `email = ?, `;
            params.push(email);
        }
        if (role !== undefined) {
            query += `role = ?, `;
            params.push(role);
        }
        if (isActive !== undefined) {
            query += `isActive = ?, `;
            params.push(isActive);
        }
        // if (dob !== undefined) {
        //     dob = dob.toISOString().split('T')[0];
        //     query += `dob = ?, `;
        //     params.push(dob);
        // }
        if (isAuthenticated !== undefined) {
            query += `isAuthenticated = ?, `;
            params.push(isAuthenticated);
        }
        if (nic !== undefined) {
            query += `nic = ?, `;
            params.push(nic);
        }
        if (mobileNo !== undefined) {
            query += `mobileNo = ?, `;
            params.push(mobileNo);
        }
        if (location !== undefined) {
            query += `location = ?, `;
            params.push(location);
        }
        if (aboutMe !== undefined) {
            query += `aboutMe = ?, `;
            params.push(aboutMe);
        }

        // Remove the trailing comma and space from the query string
        query = query.slice(0, -2);

        query += ` WHERE iduser = ?`;
        params.push(id);


        

        // Execute the query with actual values for the placeholders
        const result = await db.connection.promise().query(query, params);
        console.log(result);

        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
};


const query = `UPDATE user SET fullname = ?, email = ?, role = ?, dob = ?, isActive = ?, isAuthenticated = ?, nic = ?, mobileNo = ? WHERE iduser = ?`;
// exports.delete = async (data) => {
//     const response = await db.connection.promise().query('INSERT INTO jokes SET ?', data);
//     return response[0]
// };
