const {create, getAll, getOne, update} = require("../data-access/blog.repo");


exports.createService = async (data) => {
    try {
        data.createdAt = new Date();
        return await create(data);
    } catch (e) {
        throw e;
    }
};

exports.getAllService = async (data) => {
    try {
        const {pageIndex, pageSize, filters} = data;
        const {searchValue, status, type} = filters;
        console.log(status)
        // Prepare the WHERE clause based on provided filters
        let whereClause = 'WHERE isActive = true';

        whereClause += ` AND status = '${status}'`;

        if (type !== null) {
            whereClause += ` AND type = '${type}'`;
        }

        if (searchValue) {
            whereClause += ` AND title LIKE '%${searchValue}%'`;
        }
        // Construct the SQL query
        const query = `SELECT * FROM blogs ${whereClause}`;
        console.log(query)
        return await getAll(query, pageIndex, pageSize);
    } catch (e) {
        throw e;
    }
};

exports.getOneService = async (id) => {
    try {
        console.log(id)
        //creating query to get jokes from mySQL Db
        const query = `SELECT * FROM blogs WHERE idblogs = '${id}'`;
        return await getOne(query);
    } catch (e) {
        console.log(e)
        throw e;
    }
};

exports.updateService = async (data) => {
    try {
        //creating query to get jokes from mySQL Db
        const query = `UPDATE user SET title = ?, subTopic = ?, type = ?, isActive = ?, status = ?, content = ?, imgUrl = ? WHERE idblogs = ?`;
        return await update(data.idblogs, data);
    } catch (e) {
        throw e;
    }
};
