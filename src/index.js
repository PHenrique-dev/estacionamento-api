const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Veiculo = require('./veiculo.js');
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.post("/carros", async (req, res) =>{
    const {nome, marca, modelo, approved} = req.body;
    const veiculo = {
        nome,
        marca,
        modelo, 
        approved
    }
    try{
        await Veiculo.create(veiculo)
        res.status(201).json("Carro guardado com sucesso")
    }catch(error){
        res.status(500).json("Carro não encontrado");  
    }
});
app.post("/motos", async (req, res) =>{
    const {nome, marca, modelo, approved} = req.body;  
    const veiculo = {
        nome,
        marca,
        modelo, 
        approved
    }  
    try{
        await Veiculo.create(veiculo)
        res.status(201).json("Moto guardada com sucesso")
    }catch(error){
        res.status(500).json("Moto não encontrada");  
    }
});
app.get('/carros', async (req, res) => {
    try {
        const veiculos = await Veiculo.find()
        
        res.status(200).json(veiculos)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get('/motos', async (req, res) => {
    try {
        const veiculos = await Veiculo.find()
        
        res.status(200).json(veiculos)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const veiculo = await Veiculo.findOne({ _id: id })
        
        if (!veiculo) {
            res.status(422).json({ message: 'Carro não encontrado!' })
            return
        }
        
      res.status(200).json(veiculo)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
})
app.get('/motos/:id', async (req, res) => {
    const id = req.params.id
    
    try {
        const veiculo = await Veiculo.findOne({ _id: id })
        
        if (!veiculo) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
  
    res.status(200).json(veiculo)
} catch (error) {
      res.status(500).json({ erro: error })
    }
})
app.patch('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    const { nome, marca, modelo, approved } = req.body
    
    const veiculo = {
        nome,
        marca,
        modelo, 
        approved
    }
    
    try {
        const updatedVeiculo = await Veiculo.updateOne({ _id: id }, veiculo)
        
        if (updatedVeiculo.matchedCount === 0) {
        res.status(422).json({ message: 'Carro não encontrado!' })
        return
      }
      
      res.status(200).json(veiculo)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  app.patch('/motos/:id', async (req, res) => {
      const id = req.params.id
      
      const { nome, marca, modelo, approved } = req.body
      
      const veiculo = {
          nome,
          marca,
          modelo, 
          approved
    }
  
    try {
      const updatedVeiculo = await Veiculo.updateOne({ _id: id }, veiculo)
  
      if (updatedVeiculo.matchedCount === 0) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
  
    res.status(200).json(veiculo)
} catch (error) {
    res.status(500).json({ erro: error })
    }
})
app.delete('/carros/:id', async (req, res) => {
    const id = req.params.id
    
    const veiculo = await Veiculo.findOne({ _id: id })
    
    if (!veiculo) {
        res.status(422).json({ message: 'Carro não encontrado!' })
        return
    }
    
    try {
        await Veiculo.deleteOne({ _id: id })
        
        res.status(200).json({ message: 'Carro removido com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.delete('/motos/:id', async (req, res) => {
    const id = req.params.id
    
    const veiculo = await Veiculo.findOne({ _id: id })
    
    if (!veiculo) {
        res.status(422).json({ message: 'Moto não encontrado!' })
        return
    }
    
    try {
        await Veiculo.deleteOne({ _id: id })
        
        res.status(200).json({ message: 'Moto removida com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})
app.get("/", (req, res) =>{
    res.json({mensagem: 'API rodando!'})
});
//conexão ao mongoose
const DB_USER = 'pedroiga3'
const DB_PASSWORD ='c4d3b3b3'
mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster.iud77kb.mongodb.net/?retryWrites=true&w=majority`,)
.then(() => {
    console.log("conectamos ao Mongodb")
    app.listen(3000, () =>{
        console.log("Server tá rodando na porta 3000"); 
    });
})
.catch((err) => console.log(err))