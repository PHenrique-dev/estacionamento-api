const express = require('express');
require("dotenv").config()
const router = require("./routes/router.js")
const app = express();
const cors = require("cors")
const conn = require("./config/conn.js")
conn();
app.listen(3000, () =>{
console.log("Server tá rodando"); 
});
app.use(cors())
app.use(router)
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    }),
    )
app.use("/api", router)
app.get("/", (req, res) =>{
    res.json(200)
});
