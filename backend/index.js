const express = require('express');
require("dotenv").config()
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())
const conn = require("./config/conn.js")
conn();
    app.listen(3000, () =>{
        console.log("Server tá rodando"); 
    });
app.use(
    express.urlencoded({
        extended: true,
    }),
    )
const routes = require("./routes/router.js")
app.use("/api", routes)
app.get("/", (req, res) =>{
    res.json(200)
});
