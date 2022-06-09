const mongoose = require ('mongoose');
require('dotenv').config();

class Database{
    constructor(){
        this.connection = null;
    }

    connect(){
        console.log('Conectando ao database...');

        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Conectado com sucesso!');
            this.connection = mongoose.connection;
        }).catch(err => {
            console.error(err);
        });
    }
}

module.exports = Database;