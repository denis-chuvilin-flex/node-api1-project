// // import express
const express = require('express');

// //create a server
const server = express();

// //middleware
server.use(express.json());

let users = [
  {
    id: 1,
    user: 'Jerry',
    bio: 'I dont like Tom',
  },
  {
    id: 2,
    user: 'Mary',
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

server.get('/api/users/:id', (req, res) => {
  res.status(200).json(users.find((user) => user.id === Number(req.params.id)));
  if (!req.params.id) {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } else {
    res.status(500).json({ errorMessage: 'The user information could not be retrieved.' });
  }
});

server.get('/api/users', (req, res) => {
  res.status(200).json(users);
  if (!users) {
    res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
  }
});

server.delete('/api/users/:id', (req, res) => {
  let id = req.params.id;
  res.status(200).json(users.find((user) => user.id == id));
  !users.find((user) => {
    user.id == id
      ? res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      : res.status(500).json({ errorMessage: 'The user could not be removed' });
  });
});

server.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const foundUser = users.find((user) => user.id == id);

  if (foundUser) {
    users = users.map((user) => {
      if (user.id !== id) return user;

      return { ...user, ...req.body };
    });
  }

  if (!foundUser) {
    return res.status(404).json({ message: 'the user with the specidied ID does not exist' });
  }

  if (!req.body.user || !req.body.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio and id for the user.' });
  }

  function test() {
    if (foundUser.user !== req.body.user || foundUser.bio !== req.body.bio) {
      return res.status(500).json({ errorMessage: 'The user information could not be modified.' });
    }
  }
  setTimeout(test(), 5000);

  res.status(200).json({ Updated: users.find((user) => user.id === id) });
});

server.listen(7000, () => console.log(`SERVER RUNNING ON PORT 7000`));
