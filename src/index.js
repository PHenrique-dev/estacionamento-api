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
    const userExists = await User.findOne({ email:email })
    if(userExists){
        return res.status(422).json({msg: "Email já registrado"})
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({
        name,
        email,
        password: passwordHash,
    })
    try {
      await user.save()
      res.status(201).json({msg: 'Bem vindo(a) ao nosso estacionamento!'})  
    } catch (error) {
        res.status(500).json({msg: error})
    }
})
app.post("auth/user", async (req, res) =>{
    const{ email, password } = req.body
    if(!email){
        return res.status(422).json({msg: "O email é obrigatório"})
    }
    if(!password){
        return res.status(422).json({msg: "A senha é obrigatória"})
    }
    const user = await User.findOne({ email:email })
    if(!user){
        return res.status(404).json({msg: "Usuário não existe"})
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.status(422).json({msg: "Senha inválida"})  
    }
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id:user._id
        }, secret)
        res.status(200).json({msg: "Autenticação realizada com sucesso!", token})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})