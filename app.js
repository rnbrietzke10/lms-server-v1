const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const staff = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/staff.json`));

app.get('/api/v1/staff', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: staff.length, data: { staff } });
});

// GET staff member by id
app.get('/api/v1/staff/:id', (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find((el) => el.id === id);

  if (!staffMember) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      staffMember,
    },
  });
});

// create staff memeber
app.post('/api/v1/staff', (req, res) => {
  const newId = staff[staff.length - 1].id + 1;

  const newStaff = Object.assign({ id: newId }, req.body);
  staff.push(newStaff);

  fs.writeFile(
    `${__dirname}/dev-data/staff.json`,
    JSON.stringify(staff),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          staff: newStaff,
        },
      });
    }
  );
});

// Update post
app.patch('/api/v1/staff/:id', (req, res) => {
  const id = req.params.id * 1;
  const staffMember = staff.find((el) => el.id === id);

  if (!staffMember) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  // TODO: implement when db is set up
  res.status(200).json({
    status: 'success',
    data: 'updated staff member object',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
