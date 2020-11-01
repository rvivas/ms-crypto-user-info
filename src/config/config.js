require('dotenv').config();
// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.DEPLOY_ENV = process.env.DEPLOY_ENV || 'local';

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'local') {
    urlDB = 'mongodb://localhost:27017/crypto';
} else {
    console.log('Esta es la url', process.env.MONGO_URI)
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

