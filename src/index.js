const express = require('express');
const app = express();
const cors = require("cors")
const Carros = require('./models/carros.js');
const Motos = require('./models/motos.js');
app.use(cors())
app.use(express.json())
const conn = require("./config/conn.js")
conn();
    app.listen(3000, () =>{
        console.log("Server tá rodando na porta 3000"); 
    });
app.use(
    express.urlencoded({
        extended: true,
    }),
    )
const routes = require("./routes/router.js")
app.use("/api", routes)
app.get("/", (req, res) =>{
    res.json({mensagem: 'API rodando!'})
});
