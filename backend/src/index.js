const express = require('express');
const app = express();
const port = 8787;
const resumeInfoPath = '../static/resume_info.json';
const listLength = Object.keys(require(resumeInfoPath)).length;

console.log(`Resume list length: ${listLength}`);

var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Default page')
});

app.get('/resume_info', (req, res) => {
  res.json({
    resumeLength: listLength,
  });
});

app.get('/resume', (req, res) => {
  if (req.query.resumeID === undefined) {
    res.status(404).send('ResumeID not found because of type error')
  } else if (req.query.resumeID < 0 || req.query.resumeID > listLength) {
    res.status(404).send('ResumeID out of range')
  }

  const resumeID = req.query.resumeID
  const resumeInfo = require(resumeInfoPath)
  const resume = resumeInfo[resumeID]

  if (resume === undefined) {
    res.status(404).send('Resume not found because there is no resume with this ID')
  } else {
    res.json(resume)
  }
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
