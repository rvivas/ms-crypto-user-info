const express = require('express');
const cors = require('cors');
const UserInfo = require('../models/user');

const app = new express();
app.put('/incraseBalance', cors(), async (req, res) => {
  let { username, addToBalance } = req.body;

  const user = await UserInfo.findOne({ username });
  console.log(user);
  user.balance += addToBalance;
  const result = await UserInfo.findOneAndUpdate({ username: user.username }, user);
  console.log(result);
  return res.status(200).json({
    ok: true,
    message: 'Balance updated',
  });
});

module.exports = app;
