const {Carros: CarrosModel} = require ("../models/carros")

const carrosController = {
    create: async(req, res) => {
        try {
           const carros = {
            nome: req.body.nome,
            marca: req.body.marca,
            modelo: req.body.modelo, 
            approved: req.body.approved
           } 
           const response = await CarrosModel.create(carros)
           res.status(201).json({response, msg: "Carro guardado com sucesso"})
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) =>{
        try {
            const carros = await CarrosModel.find()
            res.json(carros)
        } catch (error) {
            console.log(error)
        }
    },
    get: async(req, res) =>{
        try {
          const id = req.params.id
          const carros = await CarrosModel.findById(id)
            if(!carros){
                res.status(404).json({msg: "Carro não encontrado"})
                return
            }

          res.json(carros)  
        } catch (error) {
            console.log(error)
        }
    },
    delete: async(req, res) =>{
        try {
            const id = req.params.id
            const carros = await CarrosModel.findById(id)
            if(!carros){
                res.status(404).json({msg: "Carro não encontrado"})
                return
            }
            const deleteCarro = await CarrosModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    },
}
module.exports = carrosController