const { handleImageUpload, uploadFileService} = require("../services/file.service");

async function uploadFile(req, res) {
    try {
        // Handle preflight OPTIONS request
     const data = await uploadFileService(req.files);
            res.status(200).send(data); // Respond with 200 OK for OPTIONS requests

    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = { uploadFile };
