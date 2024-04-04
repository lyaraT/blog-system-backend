const { handleImageUpload } = require("../services/file.service");

async function uploadFile(req, res) {
    try {
        console.log(req.files)
        // Handle preflight OPTIONS request
        if (req.method === 'OPTIONS') {
            res.status(200).end(); // Respond with 200 OK for OPTIONS requests
            return;
        }
        const fileData = await handleImageUpload(req, res);
        res.send(fileData);
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = { uploadFile };
