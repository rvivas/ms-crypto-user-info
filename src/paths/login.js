const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const UserInfo = require('../models/user');

const app = express();

app.get('/login', cors(), (req, res) => {
  let { username, password } = req.body;

  UserInfo.findOne({ username }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    console.log(userDB);
    if (!userDB) {
      console.log('info no encontrada');
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Invalid user or credentials',
        },
      });
    }
    console.log('usuario encontrado');
    if (!bcrypt.compare(password, userDB.password)) {
      console.log('password invalido');

      return res.status(400).json({
        ok: false,
        err: {
          message: 'Invalid user or credentials',
        },
      });
    }
    res.json({
      ok: true,
      usuario: userDB,
    });
  });
});

module.exports = app;
