const express = require('express');
require("dotenv").config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
const cors = require("cors")
const User = require('./models/User.js')
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
    res.json({mensagem: 'API rodando!'})
});
app.post("/auth/register", async(req, res) =>{
    const{ name, email, password, confirmpassword } = req.body
    if(!name){
        return res.status(422).json({msg: "O nome é obrigatório"})
    }
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    if(!password){
        return res.status(422).json({msg: "A senha é obrigatória"})
    }
    if(password !== confirmpassword){
        return res.status(422).json({msg: "As senhas não são iguais"})
    }
    
})