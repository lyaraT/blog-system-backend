const {handleImageUpload} = require("../services/file.service");

async function uploadFile(req, res) {
    try {
        const fileData = await handleImageUpload(req,res);
        res.send(fileData);
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = { uploadFile };
