const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser")
const crypto = require("crypto");


dotenv.config({path: __dirname+"/config/config.env"});
const app = express();
const server_port = process.env.PORT || 4000;
const client_url = process.env.CLIENT_URL;

// MIDDLEWARE
const corsOptions = {
    credentials: true,
    origin: client_url,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));



// Test Msg
app.get("/", (req, res) => {
    res.status(200).json({msg: "Hello World"});
});

// REGISTER AND LOGIN ROUTES
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

// Start Server
app.listen(server_port, () => {
    console.log(`Server is running on port http://localhost:${server_port}/`);
});