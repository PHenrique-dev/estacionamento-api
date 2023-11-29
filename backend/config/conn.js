const mongoose = require('mongoose');
async function main(){
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb+srv://pedroiga3:c4d3b3b3@cluster.iud77kb.mongodb.net/?retryWrites=true&w=majority")
        console.log("Conectado ao mongoose")
    } catch (error) {
        console.log(`Error ${error}`)
    }
}
module.exports = main