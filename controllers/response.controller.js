
const {createService, getAllService,getAllByDateService} = require("../services/response.service");

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
        console.log(blogs)
        res.status(200).send(blogs);
    } catch (e) {
        return res.status(403).send(e);
    }
};

exports.getOnebyDateController = async (req, res) => {
    try {
        const params = req.body.sessionDate;
        const response = await getAllByDateService(params);
        res.status(200).send(response);
    } catch (e) {
        console.log(e)
        return res.status(403).send(e);
    }
};