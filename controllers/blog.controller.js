const {createService, getAllService, getOneService, updateService} = require("../services/blog.service");


exports.createController = async (req, res) => {
    try {
        const result = await createService(req.body);
        res.status(201).send({status: "success", user: result});
    } catch (e) {
        return res.status(400).send({message: e.message});
    }
};

exports.getAllController = async (req, res) => {
    try {
        const params = req.body;
        const blogs = await getAllService(params);
        res.status(200).send(blogs);
    } catch (e) {
        return res.status(403).send(e);
    }
};

exports.updateController = async (req, res) => {
    try {
        const params = req.body;
        const blogs = await updateService(params);
        res.status(200).send(blogs);
    } catch (e) {
        return res.status(403).send(e);
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
