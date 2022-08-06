const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('BD conectada');
    }catch( error ) {
        console.log(error);
        throw new Error('Error en la conexión a la BD');
    }
}

module.exports = {
    dbConnection
}