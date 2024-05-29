const {create, getAll, getOne, update, deleteOne} = require("../data-access/slot.repo");

exports.createService = async (data) => {
    try {
        data.createdAt = new Date();
        return await create(data);
    } catch (e) {
        console.log(e)
        throw e;
    }
};

exports.getAllService = async (data) => {
    try {
     
        // Prepare the WHERE clause based on provided filters
        let whereClause = `WHERE date = '${data.date}'`;
    
        if (data.searchValue) {
            console.log('dddd')
            whereClause += ` AND available = 1`;
        }
        console.log('sss')
        // Construct the SQL query
        const query = `SELECT * FROM slots ${whereClause}`;
        console.log(query)
        return await getAll(query);
    } catch (e) {
        console.log(e)
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
        const query = `UPDATE slots SET available = ? WHERE id = ?`;
        console.log('dd')
        return await update(data.id, data);
    } catch (e) {
        throw e;
    }
};

exports.deleteOneService = async (id) => {
    try {
        console.log(id)
        //creating query to get jokes from mySQL Db
        const query = `DELETE FROM slots WHERE id = '${id}'`;
        return await deleteOne(query);
    } catch (e) {
        console.log(e)
        throw e;
    }
};