const express = require('express');
const { readFile, readFileSync, writeFile } = require('fs').promises;
const path = require('path');
const app = express();

// Disabling Express’s default X-Powered-By header is easy:
app.disable('x-powered-by');

// app.get('/', async (req, res) => {
app.get('/events', async (req, res) => {
  let centerid = req.query.centerid;
  let languageid = req.query.languageid;

  let data;
  if (!centerid && !languageid) {
    data = await readFile('./assets/all-events.json');
  } else if (centerid == '36' && !languageid) {
    data = await readFile('./assets/en-ranchi-events.json');
  } else if (centerid == '36' && languageid == 'hi') {
    data = await readFile('./assets/hi-ranchi-events.json');
  } else if (centerid == '41' && !languageid) {
    data = await readFile('./assets/en-chennai-events.json');
  } else if (centerid == '41' && languageid == 'ta') {
    data = await readFile('./assets/ta-chennai-events.json');
  } else {
    data = await readFile('test_failure.json');
  }

  res.type('application/json');
  res.send(data);
});

app.get('/', async (req, res) => {
  const data = await readFile('test_success.json');
  res.type('application/json');
  res.send(data);
});

// app.get('/about', (req, res) => {
//   res.type('text/plain');
//   res.send('About Meadowlark Travel');
// });

app.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.send('<h1>404 - Not Found :(</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
