const {create, getOne, getOneByEmail, getAll, update} = require("../data-access/user.repo");
const {hashPassword} = require("../util/hash");
const {SETTINGS} = require("../config/common.settings");
const jwt = require("jsonwebtoken");
const {compare} = require("bcrypt");
const generatePassword = require("generate-password");
const {sendEmailService} = require("./email.service");


exports.validateLoginReq = async (password, email) => {

    try {
        const user = await getUserData({email: email});
        if (!user[0]) {
            throw {
                message: "User not found",
            };
        }
        if (user[0] && !user[0].isActive) {
            throw {
                message: "User has been deactivated. Please contact system admin",
                activateCheck: true,
            };
        }
        if (user[0] && !user[0].isAuthenticated) {
            throw {
                message: "User Credentials Still Pending. Please contact system admin",
                activateCheck: true,
            };
        }
        return (await validateUser(password, user[0]));
    } catch (e) {
        throw {message: "Email not found"};
    }
};

const validateUser = async (password, user) => {

    try {
        const result = await compare(password, user.password);
        if (!result) {
            throw {message: "Wrong Password"};
        }
        return (await getTokenData(user));
    } catch (e) {
        throw e;
    }
};

const getTokenData = async (user) => {
    try {
        return (await generateJWT(user));
    } catch (error) {
        throw error;
    }
};

exports.registerService = async (data) => {
    try {
        const emailCheck = await getOneByEmail({email: data.email});
        if (emailCheck) {
            throw {message: "Email is already existing!", emailCheck: true};
        } else {
            // const generatedPassword = generatePassword.generate({
            //     length: 6,
            //     uppercase: false,
            // });
            // console.log(generatedPassword)
            //
            // sendEmailService(
            //     SETTINGS.EMAIL.NEW_USER_PASSWORD_SEND,
            //     {
            //         name: data.fullname,
            //         email: data.email,
            //         password: generatedPassword,
            //         url: `http://localhost:3000/auth/login`.toString(),
            //     },
            //     data.email,
            //     `User Credentials`
            // ).then(()=>{
            //     console.log('email sent')
            // });
            //
            // data.password = await hashPassword(generatedPassword);

            data.createdAt = new Date();
            return await create(data);
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
};

exports.getAllService = async (data) => {
    try {
        //creating query to get jokes from mySQL Db
        const query = `SELECT * FROM user`;
        return await getAll(query);
    } catch (e) {
        throw e;
    }
};

exports.updateService = async (data) => {
    try {
        //creating query to get jokes from mySQL Db
        const query = `UPDATE user SET fullname = ?, password = ?, role = ?, dob = ?, email = ? WHERE iduser = ?`;
        return await update(query, data);
    } catch (e) {
        throw e;
    }
};

exports.getOneService = async (id) => {
    try {
        console.log(id)
        //creating query to get jokes from mySQL Db
        const query = `SELECT * FROM user WHERE iduser = '${id}'`;
        return await getOne(query);
    } catch (e) {
        console.log(e)
        throw e;
    }
};
//
// exports.deleteService = async (data) => {
//     try{
//         //creating query to get jokes from mySQL Db
//         const query = `SELECT * FROM jokes WHERE type = '${data.type}' ORDER BY RAND() LIMIT 1`;
//         return await getJoke(query);
//     } catch (e) {
//         throw e;
//     }
// };


const generateJWT = async (user) => {

    try {
        const secretKey = SETTINGS.JWT_SECRET;
        // Set the current time as a Date object

        const currentTime = new Date();


        // Set the expiry time as 2 hours from the current time
        const expiryTime = new Date(currentTime.getTime() + (2 * 60 * 60 * 1000));

        const payload = {
            userId: user.iduser || '',
            fullname: user.fullname || '',
            email: user.email || '',
            role: user.role || '',
            dob: user.dob || '',
            createdAt: user.createdAt || '',
            isActive: user.isActive || '',
            isAuthenticated: user.isAuthenticated,
            nic: user.nic || '',
            iat: currentTime.getTime() / 1000 || '',
            exp: Math.floor(expiryTime.getTime() / 1000) || ''
        };

        return await jwt.sign(payload, secretKey);
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getUserData = async (data) => {
    return await getOneByEmail(data.email);
};
