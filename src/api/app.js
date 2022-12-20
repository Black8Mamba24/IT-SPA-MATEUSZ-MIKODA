const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const rooms = require('./storage/rooms.json');
const treatments = require('./storage/treatments.json');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:1234',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/rooms', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  res.send(rooms);
});

app.post('/sign-up', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  let rawdata = fs.readFileSync(path.resolve(__dirname, './storage/database.json'));
  let users = JSON.parse(rawdata)?.users;

  const user = users.filter(user => user.email === req.body?.email);

  if (user.length) {
    res.sendStatus(400);
  } else {
    users.push({
      email: req.body?.email,
      password: req.body?.password,
    });
    fs.writeFileSync(
      path.resolve(__dirname, './storage/database.json'),
      JSON.stringify({ users: users })
    );
    res.json(req.body);
  }
});

app.post('/sign-in', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  let rawdata = fs.readFileSync(path.resolve(__dirname, './storage/database.json'));
  let users = JSON.parse(rawdata)?.users;
  const _user = users.filter(
    user => user.email === req.body?.email && user.password === req.body?.password
  )[0];

  if (!_user) {
    res.sendStatus(401);
  } else {
    res.json(req.body);
  }
});

app.get('/rooms/:roomId', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  const room = rooms.filter(room => String(room.id) == req.params.roomId)[0];

  if (!room) {
    res.sendStatus(404);
  } else {
    res.send(room)
  }
});

app.get('/treatments', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  res.send(treatments);
});

app.get('/treatments/:treatmentId', async (req, res) => {
  await new Promise(r => setTimeout(r, 800));

  const treatment = treatments.filter(
    treatment => String(treatment.id) == req.params.treatmentId
  )[0];

  if (!treatment) {
    res.sendStatus(404);
  } else {
    res.send(treatment);
  }
});

app.listen(port, () => {
  console.log(`IT SPA app listening on port ${port}`);
});
