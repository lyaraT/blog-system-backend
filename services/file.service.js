const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require('uuid'); // Import uuidv1 to generate unique filenames

// Define the directory where uploaded images will be stored
const uploadDirectory = path.join(__dirname, '..', 'uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

async function handleImageUpload(req, res) {
    res.setHeader('Content-Type', 'application/json');

    // Allow preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            'Access-Control-Allow-Methods': 'OPTIONS, POST', // Allow OPTIONS and POST methods
            'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
        });
        res.end();
        return;
    }
    console.log(req.files.file)
    // Handle POST request for image upload
    if (req.url === '/upload' && req.method === 'POST') {
        try {
            const file = req.files.file // Assuming req.body is a FormData object
            console.log(file)
            const fileName = `${uuidv1()}.jpg`; // Generate a unique filename
            const filePath = path.join(uploadDirectory, fileName);

            // Save the file to the uploads directory
            await new Promise((resolve, reject) => {
                const writeStream = fs.createWriteStream(filePath);
                file.pipe(writeStream);
                file.on('end', resolve);
                file.on('error', reject);
            });

            const imageUrl = `/uploads/${fileName}`;

            res.writeHead(201, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            });
            res.end(JSON.stringify({ message: 'Image uploaded successfully', imageUrl }));
        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
            });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
}

module.exports = { handleImageUpload };
