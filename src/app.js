const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => res.json(repositories));

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return res.json(repositorie);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  let repo = repositories.find((repository) => repository.id === id);

  if (!repo) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  repo = {
    ...repo,
    title,
    url,
    techs,
  };

  return res.json(repo);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const repo = repositories.findIndex((repository) => repository.id === id);

  if (repo < 0) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(repo, 1);

  return res.status(204).json(repositories);
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const repo = repositories.find((repository) => repository.id === id);

  if (!repo) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  repo.likes += 1;

  return res.json(repo);
});

module.exports = app;
