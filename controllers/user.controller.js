const {updateService, getAllService, deleteService, registerService, LoginService, login, validateLoginReq,
    getOneService
} = require("../services/user.service");


exports.registerController = async (req, res) => {
    try {
        const result = await registerService(req.body);
        res.status(201).send({status: "success", user: result});
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
};


exports.login = async (req, res) => {
    try {
        const token = await validateLoginReq(req.body.password, req.body.email);
        res.status(200).send({status:"success", token: token})
    } catch (e) {
        res.status(403).send({message:e.message});
    }
};
exports.getOneController = async (req, res) => {
    try {
        const params = req.params.id;
        const user = await getOneService(params);
        res.status(200).send(user);
    } catch (e) {
        return res.status(403).send(e);
    }
};

exports.updateController = async (req, res) => {
    try {
        const params = req.body;
        const joke = await updateService(params);
        res.status(200).send(joke);
    } catch (e) {
        return res.status(403).send(e);
    }
};

exports.getAllController = async (req, res) => {
    try {
        const params = req.query;
        const joke = await getAllService(params);
        res.status(200).send(joke);
    } catch (e) {
        return res.status(403).send(e);
    }
};

exports.deleteController = async (req, res) => {
    try {
        const params = req.query;
        const joke = await deleteService(params);
        res.status(200).send(joke);
    } catch (e) {
        return res.status(403).send(e);
    }
};
