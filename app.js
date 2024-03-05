const fs = require('fs');
const express = require('express');

const app = express();

const staff = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/staff.json`));

app.get('/api/v1/staff', (req, res) => {
  res.status(200).json({ status: 'success', data: { staff: staff } });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
