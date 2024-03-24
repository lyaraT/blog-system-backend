const http = require('http');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid'); // Import uuidv1 to generate unique blob names
const { SETTINGS } = require("../config/common.settings");

const blobServiceClient = new BlobServiceClient(`https://${SETTINGS.AZURE.ACCOUNT_NAME}.blob.core.windows.net/?${SETTINGS.AZURE.SAS_TOKEN}`);
const containerClient = blobServiceClient.getContainerClient(SETTINGS.AZURE.CONTAINER_NAME);

async function handleImageUpload(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/upload' && req.method === 'POST') {
        try {
            console.log(req.body)
            const file = req.body.get('file'); // Assuming req.body is a FormData object
            const fileName = `${uuidv1()}.jpg`; // Generate a unique filename
            const blobClient = containerClient.getBlockBlobClient(fileName);

            // Upload the file to Azure Blob Storage
            const response = await blobClient.uploadData(file);

            const imageUrl = blobClient.url;
            console.log(imageUrl);

            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Image uploaded and metadata stored successfully', imageUrl }));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = { handleImageUpload };
