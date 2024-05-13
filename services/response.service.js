

const {create, getAll, getAllByDate} = require("../data-access/response.repo");


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
        const {pageIndex, pageSize, filters} = data;
        const {searchValue, status, type} = filters;
        console.log(status)
        // Prepare the WHERE clause based on provided filters
        let whereClause = '';

    
        if (searchValue) {
            whereClause += ` WHERE sessionDate LIKE '%${searchValue}%'`;
        }
        // Construct the SQL query
        const query = `SELECT * FROM appointment ${whereClause}`;
        console.log(query)
        return await getAll(query, pageIndex, pageSize);
    } catch (e) {
        throw e;
    }
};



exports.getAllByDateService = async (data) => {
    try {
          // Prepare the WHERE clause based on provided filters
          let whereClause = `WHERE sessionDate = '${data}'`;

          // Construct the SQL query
          const query = `SELECT * FROM appointment ${whereClause}`;
          console.log(query)
          return await getAllByDate(query);
    } catch (e) {
        throw e;
    }
};

