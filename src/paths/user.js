const express = require('express');
const cors = require('cors');
const UserInfo = require('../models/user');
const { restart } = require('nodemon');

const app = new express();
app.put('/incraseBalance', cors(), async (req, res) => {
  try {
    let { username, addToBalance } = req.body;
    console.log('increase', addToBalance);
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }
    user.balance += addToBalance;
    const result = await UserInfo.findOneAndUpdate({ username: user.username }, user);
    console.log('este es el resueltado', result);
    return res.status(200).json({
      ok: true,
      username: result.username,
      balance: result.balance,
      message: 'Balance updated',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
});
app.put('/decreaseBalance', cors(), async (req, res) => {
  try {
    let { username, addToBalance } = req.body;
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }
    user.balance -= addToBalance;
    const result = await UserInfo.findOneAndUpdate({ username: user.username }, user);
    return res.status(200).json({
      ok: true,
      username: result.username,
      balance: result.balance,
      message: 'Balance updated',
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error,
    });
  }
});

module.exports = app;
