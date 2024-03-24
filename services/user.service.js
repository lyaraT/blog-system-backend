const {create, getOne, getAll, update, getOneByEmail} = require("../data-access/user.repo");
const {hashPassword} = require("../util/hash");
const {SETTINGS} = require("../config/common.settings");
const jwt = require("jsonwebtoken");
const {compare} = require("bcrypt");
const generatePassword = require("generate-password");
const {sendEmailService} = require("./email.service");


exports.validateLoginReq = async (password, email) => {
    try {
        const user = await getUserDataLogin({email: email.email});
        console.log(user)
        if (!user) {
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
        return (await validateUser(password, user));
    } catch (e) {
        console.log(e)
        throw {message: "Email not found"};
    }
};

const validateUser = async (password, user) => {
    try {
        console.log(password)
        console.log(user.password)
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
        const emailCheck = await getUserData({email: data.email});
        if (emailCheck) {
            throw {message: "Email is already existing!", emailCheck: true};
        } else {
            if (data.isAuthenticated) {
                const generatedPassword = generatePassword.generate({
                    length: 6,
                    uppercase: false,
                });
                console.log(generatedPassword)

                sendEmailService(
                    SETTINGS.EMAIL.NEW_USER_PASSWORD_SEND,
                    {
                        name: data.fullname,
                        email: data.email,
                        password: generatedPassword,
                        url: `http://localhost:3000/auth/login`.toString(),
                    },
                    data.email,
                    `User Credentials`
                ).then(() => {
                    console.log('email sent')
                });

                data.password = await hashPassword(generatedPassword);
            }
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
        const {pageIndex, pageSize, filters} = data;
        const {searchValue, status} = filters;
        // Prepare the WHERE clause based on provided filters
        let whereClause = 'WHERE isActive = true';

        whereClause += ` AND isAuthenticated = '${status}'`;

        if (searchValue) {
            whereClause += ` AND fullname LIKE '%${searchValue}%'`;
        }
        // Construct the SQL query
        const query = `SELECT * FROM user ${whereClause}`;
        console.log(query)
        return await getAll(query, pageIndex, pageSize);
    } catch (e) {
        throw e;
    }
};

exports.updateService = async (data) => {
    try {
        if (data.isActive !== false) {
            const generatedPassword = generatePassword.generate({
                length: 6,
                uppercase: false,
            });

            sendEmailService(
                SETTINGS.EMAIL.NEW_USER_PASSWORD_SEND,
                {
                    name: data.fullname,
                    email: data.email,
                    password: generatedPassword,
                    url: `http://localhost:3000/auth/login`.toString(),
                },
                data.email,
                `User Credentials`
            ).then(() => {
                console.log('email sent')
            });

            data.password = await hashPassword(generatedPassword);
        }
        //creating query to get jokes from mySQL Db
        console.log(data)
        return await update(data.iduser, data);
    } catch (e) {
        throw e;
    }
};

exports.getOneService = async (id) => {
    try {
        //creating query to get jokes from mySQL Db
        const query = `SELECT * FROM user WHERE iduser = '${id}'`;
        return await getOne(query);
    } catch (e) {
        console.log(e)
        throw e;
    }
};


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
        const token = await jwt.sign(payload, secretKey);

        return {access_token: token, user:payload,}
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const getUserData = async (data) => {
    return await getOneByEmail(data.email);
};

const getUserDataLogin = async (data) => {
    console.log(data)
    return await getOneByEmail(data);
};
