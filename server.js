require('./src/config/config');
const cors = required('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

// Configuración global de rutas
app.use(require('./src/paths/routes'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) throw err;

  console.log('Base de datos ONLINE');
});

mongoose.set('debug', true);
app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});
