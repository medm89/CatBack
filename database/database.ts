import mongoose from 'mongoose';

const dbConnection = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB || '');
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al inicializar la BD');
    }
};

export {
    dbConnection
}