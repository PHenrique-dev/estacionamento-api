const express = require('express');
const app = express();
app.use(express.json());
const {NewUser} = require ("../models/register")
const bcrypt = require('bcrypt')
async function NewUserController(req, res) {
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
        const userExists = await NewUser.findOne({ email:email })
        if(userExists){
            return res.status(422).json({msg: "Email já registrado"})
        }
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        const user = new NewUser({
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
}

module.exports = { NewUserController };