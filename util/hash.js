const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt)
    } catch (e) {
        throw {message: "Password hashing failed!"};
    }
};
