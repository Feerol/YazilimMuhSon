const mongoose = require('mongoose');
// const {MongoClient}=require('mongodb');
// MongoClient.connect('mongodb+srv://fatih:1234qwe1234@cluster0.yysfaej.mongodb.net/')
mongoose.connect('mongodb+srv://ipproo:1234qwe1234@cluster0.b82xmxt.mongodb.net/denemedb')
    .then(() => {
        console.log('mongodb connected');
    })
    .catch((err) => {
        console.log("failed to connect on MONGODB !!!");
    });

//döküman oluşturma
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//toplama kısmı
const collection = new mongoose.model('Collection1', LogInSchema);
module.exports = collection;
