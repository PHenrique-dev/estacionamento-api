const {Motos: MotosModel} = require ("../models/motos")

const motosController = {
    create: async(req, res) => {
        try {
           const motos = {
            nome: req.body.nome,
            marca: req.body.marca,
            modelo: req.body.modelo, 
            approved: req.body.approved
           } 
           const response = await MotosModel.create(motos)
           res.status(201).json({response, msg: "Carro guardado com sucesso"})
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) =>{
        try {
            const motos = await MotosModel.find()
            res.json(motos)
        } catch (error) {
            console.log(error)
        }
    },
    get: async(req, res) =>{
        try {
          const id = req.params.id
          const motos = await MotosModel.findById(id)
            if(!motos){
                res.status(404).json({msg: "Carro não encontrado"})
                return
            }

          res.json(motos)  
        } catch (error) {
            console.log(error)
        }
    },
    delete: async(req, res) =>{
        try {
            const id = req.params.id
            const motos = await MotosModel.findById(id)
            if(!motos){
                res.status(404).json({msg: "Carro não encontrado"})
                return
            }
            const deletedCarro = await MotosModel.findByIdAndDelete(id)
            res.status(200).json({deletedCarro, msg:"Carro retirado"})
        } catch (error) {
            console.log(error)
        }
    },
    update:  async(req, res) =>{
        try {
            const id = req.params.id
            const motos = {
                nome: req.body.nome,
                marca: req.body.marca,
                modelo: req.body.modelo, 
                approved: req.body.approved
               } 
            const updateMotos = await MotosModel.findByIdAndUpdate(id, motos)
            if(!updateMotos){
                res.status(404).json({msg: "Carro não encontrado"})
                return
            }
            res.status(200).json({motos, msg: "Descrição do carro trocada"})
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = motosController