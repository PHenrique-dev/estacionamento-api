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
    
    app.post("/carros", async (req, res) =>{
    const {nome, marca, modelo, approved} = req.body;
    const carros = {
        nome,
        marca,
        modelo, 
        approved
    }
    try{
        await Carros.create(carros)
        res.status(201).json("Carro guardado com sucesso")
    }catch(error){
        res.status(500).json("Carro não encontrado");  
    }
});
app.post("/motos", async (req, res) =>{
    const {nome, marca, modelo, approved} = req.body;  
    const motos = {
        nome,
        marca,
        modelo, 
        approved
    }  
    try{
        await Motos.create(motos)
        res.status(201).json("Moto guardada com sucesso")
    }catch(error){
        res.status(500).json("Moto não encontrada");  
    }
});
app.get('/carros', async (req, res) => {
    try {
        const carros = await Carros.find()
        
        res.status(200).json(carros)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get('/motos', async (req, res) => {
    try {
        const motos = await Motos.find()
        
        res.status(200).json(motos)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const carros = await Carros.findOne({ _id: id })
        
        if (!carros) {
            res.status(422).json({ message: 'Carro não encontrado!' })
            return
        }
        
      res.status(200).json(carros)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
app.get('/motos/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const motos = await Motos.findOne({ _id: id })
        
        if (!motos) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
  
    res.status(200).json(motos)
} catch (error) {
      res.status(500).json({ erro: error })
    }
})
app.patch('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    const { nome, marca, modelo, approved } = req.body
    
    const carros = {
        nome,
        marca,
        modelo, 
        approved
    }
    
    try {
        const updatedCarros = await Carros.updateOne({ _id: id }, carros)
        
        if (updatedCarros.matchedCount === 0) {
        res.status(422).json({ message: 'Carro não encontrado!' })
        return
      }
      
      res.status(200).json(carros)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  app.patch('/motos/:id', async (req, res) => {
      const id = req.params.id
      
      const { nome, marca, modelo, approved } = req.body
      
      const motos = {
          nome,
          marca,
          modelo, 
          approved
    }
  
    try {
      const updatedMotos = await Motos.updateOne({ _id: id }, motos)
  
      if (updatedMotos.matchedCount === 0) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
  
    res.status(200).json(motos)
} catch (error) {
    res.status(500).json({ erro: error })
    }
})
app.delete('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    const carros = await Carros.findOne({ _id: id })
    
    if (!carros) {
        res.status(422).json({ message: 'Carro não encontrado!' })
        return
    }
    
    try {
        await Carros.deleteOne({ _id: id })
        
        res.status(200).json({ message: 'Carro removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.delete('/motos/:id', async (req, res) => {
    const id = req.params.id
    
    const motos = await Motos.findOne({ _id: id })
    
    if (!motos) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
    
    try {
        await Motos.deleteOne({ _id: id })
        
        res.status(200).json({ message: 'Moto removida com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get("/", (req, res) =>{
    res.json({mensagem: 'API rodando!'})
});
