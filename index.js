// import express
const express = require('express');

//create a server
const server = express();

//middleware
server.use(express.json());

let users = [
  {
    id: 1,
    user: Jerry,
    bio: 'I dont like Tom',
  },
  {
    id: 2,
    user: Mary,
    bio: 'I like to eat berries',
  },
];

server.post('/api/users/', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }

  users.push(req.body);

  if (!users.filter((user) => user.id == req.body.id)[0]) {
    res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' });
  }
  res.status(201).json({ Created: users.find((body) => body === req.body) });
});

const port = 8000;
server.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
