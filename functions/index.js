const express = require('express');
const { readFile, readFileSync } = require('fs').promises;
const path = require('path');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();


// Disabling Express’s default X-Powered-By header is easy:
app.disable('x-powered-by');

// app.get('/', async (req, res) => {
router.get('/events', async (req, res) => {
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

router.get('/', async (req, res) => {
  const data = await readFile('test_success.json');
  res.type('application/json');
  res.send(data);
});

// app.get('/about', (req, res) => {
//   res.type('text/plain');
//   res.send('About Meadowlark Travel');
// });

router.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.send('<h1>404 - Not Found :(</h1>');
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);