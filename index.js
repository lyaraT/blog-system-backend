const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require('http')
const userRoutes = require("./routes/user.routes");
const {initDb} = require("./database/database");
const blogRouter = require("./routes/blog.routes");
const fileRouter = require("./routes/file.routes");
const multer = require("multer");


const app = express()


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/blog", blogRouter);
app.use("/file", fileRouter);

PORT = 3000 || SETTINGS.PORT;

initDb().then(() => {
    http.createServer(app).listen(PORT, () => {
        console.log(`Blog Backend running on port: ` + PORT);
    });
});
