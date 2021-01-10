const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const UserInfo = require('../models/user');
const app = express();

app.post('/login', cors(), async (req, res) => {
  try {
    let { username, password } = req.body;
    const resultUser = await UserInfo.findOne({ username });
    console.log(resultUser);
    if (!resultUser) {
      console.log('info no encontrada');
      return res.status(404).json({
        ok: false,
        message: 'Invalid user or credentials',
      });
    }
    if (!bcrypt.compare(password, resultUser.password)) {
      console.log('password invalido');

      return res.status(404).json({
        ok: false,
        message: 'Invalid user or credentials',
      });
    }
    return res.status(200).json({
      ok: true,
      usuario: resultUser,
    });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
});

module.exports = app;
